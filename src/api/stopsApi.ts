// this is for talking to the backend about stops (only fetch calls here no vue shit)
import type { Stop, StopInput } from '@shared/types'

export async function fetchStops(): Promise<Stop[]> {
  const response = await fetch("/api/v1/stops");
  if (!response.ok) { throw new Error(response.status.toString()) }
  return await response.json();
}

export async function fetchStop(id: number): Promise<Stop> {
  const response = await fetch(`/api/v1/stops/${id}`);
  if (!response.ok) { throw new Error(response.status.toString()) }
  return await response.json();
}

export async function addStop(stop: StopInput): Promise<Stop> {
  const response = await fetch("/api/v1/stops", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // empty text inputs should be saved as null, not ""
    body: JSON.stringify({
      ...stop,
      transfer_lines: stop.transfer_lines || null,
      image_url: stop.image_url || null,
    }),
  });
  if (!response.ok) { throw new Error(response.status.toString()) }
  return await response.json();
}
  
  

export async function deleteStop(id: number) {
  const response = await fetch(`/api/v1/stops/${id}`,{
    method: "DELETE",
  });
  
  if (!response.ok) { throw new Error(response.status.toString()) }
}

export async function updateStop(id: number) {
  const response = await fetch(`/api/v1/stops/${id}`,{
    method: "",
  });
  
  if (!response.ok) { throw new Error(response.status.toString()) }
}

