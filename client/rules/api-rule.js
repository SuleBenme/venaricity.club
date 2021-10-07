const create = async (rule, credentials) => {
    try {
      let response = await fetch('/api/manager/rules/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(rule)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}


const list = async (signal) => {
    try {
        let response = await fetch('/api/manager/rules/', {
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

const remove = async (ruleId, credentials) => {
    try {
    let response = await fetch('/api/manager/rules/', {
        method: 'DELETE',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(ruleId)
    })
    return await response.json()
    } catch(err) {
    console.log(err)
    }
}

const update = async (rule, credentials) => {
  try {
    let response = await fetch('/api/manager/rules/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(rule)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const sort = async (data, credentials) => {
  try {
    let response = await fetch('/api/manager/rules/sort/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(data)
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
  sort
}
