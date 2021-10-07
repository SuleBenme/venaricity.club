const create = async (news, credentials) => {
      try {
        let response = await fetch('/api/admin/news/', {
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

const list = async (credentials, signal) => {
    try {
      let response = await fetch('/api/admin/news/', {
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

const listPublished = async (signal) => {
  try {
    let response = await fetch('/api/news/', {
      method: 'GET',
      signal: signal
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const publish = async (credentials, enrollment) => {
  try {
    let response = await fetch('/api/admin/news/publish', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(enrollment)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const remove = async (playerId, credentials) => {
  try {
    let response = await fetch('/api/admin/news/', {
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
const read = async (params, signal) => {
  try {
    let response = await fetch('/api/news/' + params.newsId, {
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
    publish,
    remove,
    read,
    listPublished,
}
  
  