import { signout } from './api-auth.js'

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (localStorage.getItem('jwt'))
      return JSON.parse(localStorage.getItem('jwt'))
    else
      return false
  },
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      localStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
  },
  clearJWT(cb) {
    if (typeof window !== "undefined")
      localStorage.removeItem('jwt')
    cb()
  }
}

export default auth
