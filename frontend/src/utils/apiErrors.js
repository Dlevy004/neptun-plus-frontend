export function getGenericErrorMessage(error) {
  if (!error?.status || error.status >= 500) {
    return 'A szerver most nem érhető el. Próbáld újra később.'
  }
  return 'Valami hiba történt. Próbáld újra.'
}

export function getLoginErrorMessage(error) {
  if (error?.status === 400 || error?.status === 401) return 'Hibás e-mail cím vagy jelszó.'
  return getGenericErrorMessage(error)
}

const ALREADY_EXISTS = {
  email: 'Ez az e-mail cím már használatban van.',
  username: 'Ez a felhasználónév már foglalt.',
}

// A szerver mezőnkénti hibáit adja vissza: { email: '...', username: '...' }
export function getRegisterFieldErrors(error) {
  if (error?.status !== 400 || !error.data || typeof error.data !== 'object') return {}

  return Object.fromEntries(
    Object.entries(error.data).map(([field, messages]) => {
      const message = Array.isArray(messages) ? messages[0] : String(messages)
      const isDuplicate = /already exists/i.test(message) && ALREADY_EXISTS[field]
      return [field, isDuplicate ? ALREADY_EXISTS[field] : message]
    })
  )
}