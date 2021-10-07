const create = async (news, credentials) => {
    try {
      let response = await fetch('/api/admin/tournament/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(news)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}

const list = async (credentials, signal) => {
  try {
    let response = await fetch('/api/admin/tournament/', {
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

const prueba = async (credentials, signal) => {
  try {
    let response = await fetch('/api/tournaments/secret/', {
      method: 'POST',
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

const confirmPayment = async (credentials, prueba) => {
  console.log(prueba)
  try {
    let response = await fetch('/api/tournaments/confirm-payment/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
    },
      body: JSON.stringify(prueba)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const remove = async (tournamentId, credentials) => {
    try {
      let response = await fetch('/api/admin/tournament/', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(tournamentId)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}

const addParticipant = async (tournamentId, credentials, participant) => {
  try {
    let response = await fetch('/api/tournaments/prueba/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({tournamentId: tournamentId, participant: participant})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const listNotSignedIn = async (signal) => {
  try {
    let response = await fetch('/api/tournaments/', {
      method: 'GET',
      signal: signal
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const read = async (params, signal) => {
  try {
    let response = await fetch('/api/tournaments/' + params.tournamentId, {
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

const comment = async (credentials, tournamentId, comment) => {
  try {
    let response = await fetch('/api/tournaments/groupChat/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({tournamentId: tournamentId, comment: comment})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const listMessages = async (credentials, groupChatId) => {
  try {
    let response = await fetch('/api/tournaments/groupChat/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
    },
      body: groupChatId
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
  addParticipant,
  listNotSignedIn,
  read,
  prueba,
  confirmPayment,
  comment,
  listMessages
}

