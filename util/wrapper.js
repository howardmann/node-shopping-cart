const wrapper = promise => {
  return promise
    .then(data => ({data, error: null}))
    .catch(error => ({error, data: null}))
}

module.exports = wrapper