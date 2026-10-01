// this is for talking to the backend about users (only fetch calls here, no vue state)

export async function fetchUsernames(): Promise<string[]> {
  const response = await fetch("/api/v1/users");
  if (!response.ok) { throw new Error(response.status.toString()) }
  return await response.json();
}

export async function registerUser(name: string, password: string): Promise<void> {
  const response = await fetch("/api/v1/register", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, name }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error)
  }
}

// returns true if the login worked, false if the credentials were wrong
export async function loginUser(name: string, password: string): Promise<boolean> {
  const response = await fetch("/api/v1/login", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, name }),
  });
  if (response.status == 401) { return false }
  if (response.status == 200) { return true }
  const error = await response.json();
  throw new Error(error.error)
}
