const REFRESH_URL = '/api/accounts/token/refresh/'

let accessToken = null
let sessionExpiredListener = null
let refreshing = null

export const setAccessToken = (token) => {
  accessToken = token
}

export const setSessionExpiredListener = (listener) => {
  sessionExpiredListener = listener
}

export class ApiError extends Error {
  constructor(status, data) {
    super(`API hiba (${status})`)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

// Új access tokent kér a refresh cookie-val. Egyszerre csak egy ilyen kérés fut,
// a párhuzamos hívások ugyanarra az eredményre várnak. Igazat ad vissza, ha sikerült.
export function refreshAccessToken() {
  refreshing ??= fetch(REFRESH_URL, { method: 'POST', credentials: 'include' })
    .then(async (response) => {
      if (!response.ok) throw new Error('A munkamenet lejárt')
      const data = await response.json()
      accessToken = data.access
      return true
    })
    .catch(() => {
      accessToken = null
      return false
    })
    .finally(() => {
      refreshing = null
    })

  return refreshing
}

export async function request(url, { method = 'GET', body, auth = true, retry = true } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (auth && accessToken) headers.Authorization = `Bearer ${accessToken}`

  let response
  try {
    response = await fetch(url, {
      method,
      headers,
      credentials: 'include',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(0, null) // hálózati hiba
  }

  // Lejárt access token: egyszer újat kérünk, és megismételjük a kérést
  if (response.status === 401 && auth && retry) {
    if (await refreshAccessToken()) {
      return request(url, { method, body, auth, retry: false })
    }
    sessionExpiredListener?.()
  }

  const data = await response.json().catch(() => null)
  if (!response.ok) throw new ApiError(response.status, data)

  return data
}