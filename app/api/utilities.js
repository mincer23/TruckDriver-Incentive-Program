// This file contains some recurring helper functions for the backend, mostly
// security stuff for routes that require specific flavors of authentication
const zxcvbn = require('zxcvbn')

// Simple route middleware to ensure user is admin.
function ensureAdmin (req, res, next) {
  if (req?.session?.user?.isAdmin) { return next() }
  res.redirect('/')
}

// Simple route middleware to ensure user is a sponsor or an admin.
function ensureSponsor (req, res, next) {
  if (req?.session?.user?.isAdmin || req?.session?.user?.staffFor?.length > 0) { return next() }
  res.redirect('/')
}

// Simple route middleware to ensure user is authenticated as any valid user.
function ensureAuthenticated (req, res, next) {
  if (req?.session?.user) { return next() }
  res.redirect('/')
}

// zxcvbn password handling
function isPasswordStrong (password) {
  if (zxcvbn(password).score > 2) {
    return true
  }
  return false
}

export {
  ensureAdmin,
  ensureSponsor,
  ensureAuthenticated,
  isPasswordStrong
}
