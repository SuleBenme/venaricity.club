const create = async (partner, credentials) => {
    try {
      let response = await fetch('/api/partners/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: partner
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}

const list = async (signal) => {
  try {
    let response = await fetch('/api/partners/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
    },
      signal: signal
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const remove = async (partnerId, credentials) => {
    try {
    let response = await fetch('/api/partners/', {
        method: 'DELETE',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(partnerId)
    })
    return await response.json()
    } catch(err) {
    console.log(err)
    }
}

const read = async (params, signal) => {
  try {
    let response = await fetch('/api/partners/' + params.partnerId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const update = async (partner, credentials) => {
  try {
    let response = await fetch('/api/partners/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: partner
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  create,
  list,
  remove,
  read,
  update
}

