const axios = require('axios');

module.exports = function (options, callback) {
  axios.get(options.uri)
  .then(function(response) {
    response.statusCode = response.status
    callback(null, response, JSON.stringify(response.data))
  })
  .catch(function (error) {
    callback(error)
  })
}