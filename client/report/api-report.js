const create = async (task) => {
    try {
      let response = await fetch('/api/report/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          //'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(task)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}


const list = async (signal) => {
    try {
        let response = await fetch('/api/report/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              //'Authorization': 'Bearer ' + credentials.t
        },
        signal: signal
        })
        return await response.json()
    } catch(err) {
      console.log(err)
    }
}


const complete = async (credentials, task) => {
    try {
    let response = await fetch('/api/report/complete/', {
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(task)
    })
    return await response.json()
    } catch(err) {
    console.log(err)
    }
}

const remove = async (taskId, credentials) => {
    try {
    let response = await fetch('/api/report/', {
        method: 'DELETE',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(taskId)
    })
    return await response.json()
    } catch(err) {
    console.log(err)
    }
}

export {
  create,
  list,
  complete,
  remove,
}