const axios = require('axios');

module.exports = function (options, callback) {
  var axiosGet = axios.get(options.uri || options.url)

  // if(options.headers) {
  //   var axiosGet = axios.get(options.uri, {
  //     headers: options.headers
  //   })
  // }
  
  axiosGet.then(function(response) {
    response.statusCode = response.status
    callback(null, response, response.data)
  })
  .catch(function (error) {
    callback(error)
  })
}