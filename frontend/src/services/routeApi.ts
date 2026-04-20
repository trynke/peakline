import type { Route } from '../types/route'

const API_BASE = import.meta.env.VITE_API_BASE ?? '/api'

export async function uploadRoute(file: File): Promise<Route> {
  const form = new FormData()
  form.append('file', file)

  const res = await fetch(`${API_BASE}/routes`, {
    method: 'POST',
    body: form,
  })

  if (!res.ok) {
    throw new Error(`Failed to upload route: ${res.status}`)
  }

  return (await res.json()) as Route
}
