// This file contains some recurring helper functions for the backend, mostly
// security stuff for routes that require specific flavors of authentication

// Simple route middleware to ensure user is admin.
function ensureAdmin (req, res, next) {
  if (req?.session?.user?.isAdmin) { return next() }
  res.redirect('/')
}

// Simple route middleware to ensure user is a sponsor.
function ensureSponsor (req, res, next) {
  if (req?.session?.user?.isAdmin || req?.session?.user?.sponsorFor?.length > 0) { return next() }
  res.redirect('/')
}

// Simple route middleware to ensure user is authenticated as any valid user.
function ensureAuthenticated (req, res, next) {
  if (req?.session?.user) { return next() }
  res.redirect('/')
}

export {
  ensureAdmin,
  ensureSponsor,
  ensureAuthenticated
}
