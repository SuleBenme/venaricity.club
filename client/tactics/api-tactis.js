const list = async (signal) => {
    try {
        let response = await fetch('/api/tactics/', {
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

const update = async (rule, credentials) => {
  try {
    let response = await fetch('/api/tactics/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(rule)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  list,
  update
}
