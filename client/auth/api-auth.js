const signin = async (user) => {
  try {
    let response = await fetch('/auth/signin/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const signout = async () => {
  try {
    let response = await fetch('/auth/signout/', { method: 'GET' })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}
const forgotPassword = async (email) => {
  console.log("email: ", email);
  try {
  let response = await fetch('api/forgot-password/', {
      method: "PUT",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}

const resetPassword = async (resetInfo) => {
  try{
      let response = await fetch('/api/reset-password/', {
      method: "PUT",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(resetInfo)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}

const verifyEmail = async (verifyInfo, signal) => {
  try{
      let response = await fetch('/api/verify-email/', {
      method: "PUT",
      signal: signal,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(verifyInfo)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}
export {
  signin,
  signout,
  forgotPassword,
  resetPassword,
  verifyEmail
}
