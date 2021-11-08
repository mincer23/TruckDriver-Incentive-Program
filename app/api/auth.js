/* eslint-disable no-console */
// Rudimentary authentication checker
export default function (req, res, next) {
  // should we protect this path?
  if (req.path !== '/login') { // yes
    // does the session exist
    if (req.session?.user) {
      // all questions OK, move on
      console.log('ALLOWED ACCESS TO ' + req.session.user.username)
      next()
    } else {
      // if any of the tests fail, redirect to login
      console.log('REJECTED ACCESS FROM IP: ' + req.socket.remoteAddress)
      res.redirect('/login')
    }
  } else { // no
    // let the user go wherever they want since it's unimportant
    next()
  }
}
