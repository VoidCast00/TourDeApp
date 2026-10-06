// this is for talking to the backend about stops (only fetch calls here no vue shit)
import type { Stop } from '@shared/types'

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
