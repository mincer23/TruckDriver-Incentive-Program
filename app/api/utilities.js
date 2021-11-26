// This file contains some recurring helper functions for the backend, mostly
// security stuff for routes that require specific flavors of authentication
const bcrypt = require('bcrypt')
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

// https://www.thiscodeworks.com/async-function-for-bcrypt-compare-bcrypt-authentication-express-nodejs-password/60bcedfdf7d259001478aeb7
async function comparePassword (password, hash) {
  try {
    const result = await bcrypt.compare(password, hash)
    return result
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
  return false
}

export {
  ensureAdmin,
  ensureSponsor,
  ensureAuthenticated,
  isPasswordStrong,
  comparePassword
}
