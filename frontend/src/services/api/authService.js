// Authentication Service - Manages authentication state & tokens
// No direct API calls — those should be handled in components or a dedicated API service

class AuthService {
  // Save user session after login
  setSession({ token, role, userId }) {
    if (token) localStorage.setItem("authToken", token)
    if (role) localStorage.setItem("userRole", role)
    if (userId) localStorage.setItem("userId", userId)
  }

  // Remove user session on logout
  logout() {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userId")
    window.location.href = "/login"
  }

  // Get stored token
  getToken() {
    return localStorage.getItem("authToken")
  }

  // Get stored role
  getUserRole() {
    return localStorage.getItem("userRole")
  }

  // Get stored userId
  getUserId() {
    return localStorage.getItem("userId")
  }

  // Check if user is logged in
  isAuthenticated() {
    return !!this.getToken()
  }

  // Authorization header for API calls
  getAuthHeaders() {
    const token = this.getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }
}

export default new AuthService()
