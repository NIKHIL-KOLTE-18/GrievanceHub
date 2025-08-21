// Utility Helper Functions

import { COMPLAINT_STATUS, USER_ROLES } from "./constants"

// Format date to readable string
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Format date with time
export const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Get status badge variant for Bootstrap
export const getStatusBadgeVariant = (status) => {
  const variants = {
    [COMPLAINT_STATUS.PENDING]: "warning",
    [COMPLAINT_STATUS.IN_PROGRESS]: "info",
    [COMPLAINT_STATUS.RESOLVED]: "success",
    [COMPLAINT_STATUS.REJECTED]: "danger",
  }
  return variants[status] || "secondary"
}

// Get role badge variant
export const getRoleBadgeVariant = (role) => {
  const variants = {
    [USER_ROLES.FACULTY]: "primary",
    [USER_ROLES.STUDENT]: "success",
    [USER_ROLES.ADMIN]: "danger",
  }
  return variants[role] || "secondary"
}

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate password strength
export const validatePassword = (password) => {
  const minLength = 6
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)

  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
    errors: [
      ...(password.length < minLength ? [`Password must be at least ${minLength} characters long`] : []),
      ...(!hasUpperCase ? ["Password must contain at least one uppercase letter"] : []),
      ...(!hasLowerCase ? ["Password must contain at least one lowercase letter"] : []),
      ...(!hasNumbers ? ["Password must contain at least one number"] : []),
    ],
  }
}

// Generate random ID (for mock data)
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + "..."
}

// Get file extension
export const getFileExtension = (filename) => {
  return filename.split(".").pop().toLowerCase()
}

// Check if file is valid image
export const isValidImageFile = (file) => {
  const validTypes = ["jpg", "jpeg", "png", "gif"]
  const extension = getFileExtension(file.name)
  return validTypes.includes(extension)
}

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Debounce function
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
