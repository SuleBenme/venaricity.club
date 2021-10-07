const create = async (user, credentials) => {
    try {
      let response = await fetch('/api/admin/players/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: user
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  const list = async (credentials, signal) => {
    try {
      let response = await fetch('/api/admin/players/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
      },
        signal: signal
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  const listPlayers = async (signal) => {
    try {
      let response = await fetch('/api/players/', {
        method: 'GET',
        signal: signal
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  
  const update = async (user, credentials) => {
    try {
      let response = await fetch('/api/admin/players/', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: user
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const remove = async (playerId, credentials) => {
    try {
      let response = await fetch('/api/admin/players/', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(playerId)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }


const canAddPlayers = async (credentials, signal) => {
  try {
    let response = await fetch('/api/admin/update-players/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
    },
      signal: signal
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const addPlayers = async (players, credentials) => {
    try {
      let response = await fetch('/api/admin/update-players/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(players)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}

const createPlayer = async (player, credentials) => {
  console.log(player)
  try {
    let response = await fetch('/api/admin/create-player/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(player)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const read = async (params, signal) => {
  try {
    let response = await fetch('/api/players/' + params.playerName, {
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
    update,
    remove,
    listPlayers,
    canAddPlayers,
    addPlayers,
    createPlayer,
    read
}
  
  