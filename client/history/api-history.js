const create = async (news, credentials) => {
    try {
      let response = await fetch('/api/history/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: news
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}

const list = async (signal) => {
  try {
    let response = await fetch('/api/history/', {
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

const remove = async (historyId, credentials) => {
    try {
    let response = await fetch('/api/history/', {
        method: 'DELETE',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(historyId)
    })
    return await response.json()
    } catch(err) {
    console.log(err)
    }
}

const update = async (history, credentials) => {
  try {
    let response = await fetch('/api/history/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: history
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const read = async (params, signal) => {
  try {
    let response = await fetch('/api/history/' + params.historyId, {
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

export {
  create,
  list,
  remove,
  update,
  read
}

