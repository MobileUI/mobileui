const axios = require('axios');

module.exports = function (options, callback) {
  if(!options.download) {
    axios.get(options.uri || options.url).then(function(response) {
      response.statusCode = response.status
      callback(null, response, response.data)
    })
    .catch(function (error) {
      callback(error)
    })
  } else {
    axios({
      method: 'get',
      url: options.uri || options.url,
      responseType: 'stream'
    }).then(function (response) {
        response.statusCode = response.status
      callback(null, response, response.data)
    }).catch(function (error) {
      callback(error)
    })
  }

  
}