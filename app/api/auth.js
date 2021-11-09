/* eslint-disable no-console */
// Rudimentary authentication checker
export default function (req, res, next) {
  // should we protect this path?
  if (req.path !== '/login' && req.path !== '/api/login' && req.path !== '/api/users') { // yes
    // does the session exist
    if (req.session?.user) {
      // all questions OK, move on
      console.log('ALLOWED ACCESS TO ' + req.session.user.userName)
      next()
    } else {
      // if any of the tests fail, redirect to login
      console.log('REJECTED UNAUTHOIRZED ACCESS @ IP: ' + req.socket.remoteAddress + ' TO ROUTE: ' + req.path)
      res.redirect('/login')
    }
  } else { // no
    // let the user go wherever they want since it's unimportant
    next()
  }
}
