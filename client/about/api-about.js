const list = async (signal) => {
    try {
      let response = await fetch('/api/about/', {
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

const create = async (content) => {
    try {
      let response = await fetch('/api/about/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}
  
const update = async (content, credentials) => {
  try {
    let response = await fetch('/api/about/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(content)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}
  
export {
    list,
    create,
    update
}
