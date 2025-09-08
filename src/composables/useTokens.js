export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const setAccessToken = (token) => localStorage.setItem('accessToken', token);
export const setRefreshToken = (token) => localStorage.setItem('refreshToken', token);
export const setUserData = (user) => localStorage.setItem('user', JSON.stringify(user));

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user')
};

export const isTokenExpired = (token) => {
  try {
    if (!token) return true; // No token means expired
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const exp = payload.exp; // Expiration time in seconds (Unix timestamp)
    const now = Math.floor(Date.now() / 1000); // Current time in seconds

    return exp < now; // Returns true if token is expired, false otherwise
  } catch (error) {
    console.error("Invalid token", error);
    return true; // Treat invalid tokens as expired
  }
}