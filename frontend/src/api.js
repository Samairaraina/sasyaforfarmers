const BASE = import.meta.env.VITE_API_BASE || ''

export async function api(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}
