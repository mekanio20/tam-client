import { jwtDecode } from "jwt-decode"

export function isTokenValid(token) {
  if (!token) return false
  try {
    const decoded = jwtDecode(token)
    const now = Date.now() / 1000
    return decoded.exp > now
  } catch (e) {
    return false
  }
}