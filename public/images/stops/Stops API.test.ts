import { faker } from "@faker-js/faker";
import { test, expect } from "vitest";
import z from "zod";

const baseUrl = process.env.TARGET_URL!.replace(/\/$/, "");
const ADMIN_API_KEY = "Kyqc49jIM+5+D0Sed8ZQ671gxkd7W/bBTWjDtZ0Zrgk=";

function uniqueName(prefix = "AT Stop") {
  return `${prefix} ${faker.location.street()} ${faker.string.alphanumeric(8)}`;
}

const StopSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  image_url: z.union([z.string(), z.null()]),
  wheelchair_accessible: z.boolean(),
  has_shelter: z.boolean(),
  has_ticket_machine: z.boolean(),
});

const StopListSchema = z.array(StopSchema);

function stopsUrl(path = ""): string {
  return `${baseUrl}/api/v1/stops${path}`;
}

function adminHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return {
    Authorization: `Bearer ${ADMIN_API_KEY}`,
    ...extra,
  };
}

function adminJsonHeaders(): Record<string, string> {
  return adminHeaders({ "Content-Type": "application/json" });
}

function assertStop(data: unknown, label = "zastávka") {
  const parsed = StopSchema.safeParse(data);
  expect(
    parsed.success,
    `${label}: ${JSON.stringify(parsed.error?.format())}`,
  ).toBe(true);
  return parsed.data!;
}

async function deleteStop(id: number): Promise<void> {
  await fetch(stopsUrl(`/${id}`), {
    method: "DELETE",
    headers: adminHeaders(),
  });
}

test("10 GET /api/v1/stops vrací seznam zastávek podle API kontraktu", async () => {
  const res = await fetch(stopsUrl());
  expect(res.status, "GET /api/v1/stops musí vracet 200").toBe(200);

  const contentType = res.headers.get("content-type") ?? "";
  expect(contentType, "seznam zastávek musí být JSON").toMatch(
    /application\/json/i,
  );

  const parsed = StopListSchema.safeParse(await res.json());
  expect(
    parsed.success,
    JSON.stringify(parsed.error?.format()),
  ).toBe(true);

  const stops = parsed.data!;
  expect(stops.length, "seznam zastávek nesmí být prázdný").toBeGreaterThan(0);

  const ids = stops.map((stop) => stop.id);
  expect(
    new Set(ids).size,
    "id zastávek v seznamu musí být unikátní",
  ).toBe(ids.length);
});

test("11 POST GET PUT DELETE /api/v1/stops – kompletní CRUD happy path", async () => {
  const createPayload = {
    name: uniqueName(),
    image_url: null,
    wheelchair_accessible: true,
    has_shelter: false,
    has_ticket_machine: true,
  };

  const createRes = await fetch(stopsUrl(), {
    method: "POST",
    headers: adminJsonHeaders(),
    body: JSON.stringify(createPayload),
  });
  expect(createRes.status, "POST /api/v1/stops musí vracet 201").toBe(201);

  const created = assertStop(await createRes.json(), "POST odpověď");
  expect(created.name).toBe(createPayload.name);
  expect(created.image_url).toBeNull();
  expect(created.wheelchair_accessible).toBe(true);
  expect(created.has_shelter).toBe(false);
  expect(created.has_ticket_machine).toBe(true);

  try {
    const getRes = await fetch(stopsUrl(`/${created.id}`));
    expect(getRes.status, "GET /api/v1/stops/:id musí vracet 200").toBe(200);
    const fetched = assertStop(await getRes.json(), "GET detail");
    expect(fetched).toEqual(created);

    const listRes = await fetch(stopsUrl());
    expect(listRes.status).toBe(200);
    const list = StopListSchema.parse(await listRes.json());
    expect(
      list.some((stop) => stop.id === created.id),
      "nově vytvořená zastávka musí být v seznamu",
    ).toBe(true);

    const updatePayload = {
      name: `${createPayload.name} Updated`,
      image_url: "https://example.com/stops/at-test.jpg",
      wheelchair_accessible: false,
      has_shelter: true,
      has_ticket_machine: false,
    };

    const putRes = await fetch(stopsUrl(`/${created.id}`), {
      method: "PUT",
      headers: adminJsonHeaders(),
      body: JSON.stringify(updatePayload),
    });
    expect(putRes.status, "PUT /api/v1/stops/:id musí vracet 200").toBe(200);

    const updated = assertStop(await putRes.json(), "PUT odpověď");
    expect(updated.id).toBe(created.id);
    expect(updated.name).toBe(updatePayload.name);
    expect(updated.image_url).toBe(updatePayload.image_url);
    expect(updated.wheelchair_accessible).toBe(false);
    expect(updated.has_shelter).toBe(true);
    expect(updated.has_ticket_machine).toBe(false);

    const getUpdatedRes = await fetch(stopsUrl(`/${created.id}`));
    expect(getUpdatedRes.status).toBe(200);
    expect(assertStop(await getUpdatedRes.json(), "GET po PUT")).toEqual(
      updated,
    );

    const deleteRes = await fetch(stopsUrl(`/${created.id}`), {
      method: "DELETE",
      headers: adminHeaders(),
    });
    expect(
      deleteRes.status,
      "DELETE /api/v1/stops/:id musí vracet 204",
    ).toBe(204);
    expect(await deleteRes.text(), "DELETE nesmí mít tělo odpovědi").toBe("");

    const goneRes = await fetch(stopsUrl(`/${created.id}`));
    expect(
      goneRes.status,
      "smazaná zastávka nesmí být dále dostupná",
    ).toBe(404);
  } catch (error) {
    await deleteStop(created.id);
    throw error;
  }
});

test("12 POST /api/v1/stops generuje id na serveru", async () => {
  const createPayload = {
    name: uniqueName("AT Generated Id"),
    wheelchair_accessible: true,
    has_shelter: true,
    has_ticket_machine: false,
  };

  const createRes = await fetch(stopsUrl(), {
    method: "POST",
    headers: adminJsonHeaders(),
    body: JSON.stringify(createPayload),
  });
  expect(createRes.status).toBe(201);

  const created = assertStop(await createRes.json(), "POST odpověď");
  expect(created.id, "id musí generovat server").toBeGreaterThan(0);

  await deleteStop(created.id);
});

