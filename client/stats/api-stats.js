const list = async (signal) => {
    try {
      let response = await fetch('/api/stats/', {
        method: 'GET',
        signal: signal
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}
export {
    list,
}
  