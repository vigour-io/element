'use strict'
var Api = require('vigour-api')
//   var axios = require('axios')
//   var request = require('hyperquest')
// var config = require('../../package.json').vigour.api.video

// console.warn(' THE CONFIG !!!! ', config)

var getSource = new Api()
var sendPlayback = new Api()
var sendEvent = new Api()

var getSourceApi = getSource
// var getSourceConfig = config.getSource


var http = require('http')
var opts = {
  port: 80,
  host: 'adm-ums.vigour.io',
  method: 'post',
  path: '/login/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

console.log('===================== HEY')
var req = http.request(opts)
req.end(JSON.stringify({
  username: 'zappa2@mailinator.com',
  password: 'zappa2'
}))


// Api.prototype.set({
//   define: {
//     request () {
//       var api = this
//       if (api.loading.val) {
//         return
//       }
//       api.loading.val = true

//       var httpMethod = api.httpMethod || 'get'
//       var opts = {
//         method: httpMethod,
//         headers: api.headers
//       }
//     }
//   }
// })

// var login = new Api({
//   url: 'http://adm-ums.vigour.io/login/api',
//   httpMethod: 'post',
//   encodeJson: true,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   }
// })

// login.request({
//   username: 'zappa2@mailinator.com',
//   password: 'zappa2'
// })

// getSourceApi.set({
//   inject: getSourceConfig,
//   define: {
//     makeRequest () {
//       var url = getSourceConfig.url
//       if (this.asset.val && this.protocol.val) {
//         url += this.asset.val + '/' + this.protocol.val
//         if (!this.loading.val) {

//           this.url = url
          

//           // var req = request(url, {
//           //   method: 'GET',
//           //   headers: {
//           //     'Accept': 'application/json'
//           //   }
//           // })

//           // req.on('response', function (res) {
//           //   var data = ''
//           //   res.on('data', function (chunk) {
//           //     console.log('GOT DATA')
//           //     data += chunk
//           //   })
//           //   res.on('end', function () {
//           //     console.log('ENDED!', data)
//           //   })
//           //   res.on('error', function (err) {
//           //     console.error(err)
//           //   })
//           // })

//           // axios.get(url)
//           //   .then(function (data) {
//           //     console.log('THE DATA', data)
//           //   }, function (err) {
//           //     console.error(err)
//           //   })
//           this.request()
//         }
//       }
//     }
//   },
//   protocol: {
//     val: false,
//     on: {
//       data (data) {
//         this.parent.makeRequest()
//       }
//     }
//   },
//   asset: {
//     val: false,
//     on: {
//       data (data) {
//         this.parent.makeRequest()
//       }
//     }
//   }
// })

// var sendPlaybackApi = sendPlayback
// var sendPlaybackConfig = config.sendPlayback

// sendPlaybackApi.set({
//   inject: sendPlaybackConfig,
//   properties: {
//     logData: true
//   },
//   logData: false,
//   define: {
//     makeRequest () {
//       var url = getSourceConfig.url
//       if (this.asset.val && this.logId.val) {
//         url += this.asset.val + '/' + this.logId.val
//         if (!this.loading.val) {
//           this.url = url
//           this.request()
//         }
//       }
//     },
//     build () {
//       return {
//         logData: this.logData
//       }
//     },
//     validate () {
//       var errors = []
//       if (!this.logData && typeof logData !== 'string') {
//         return errors.push({
//           field: 'logData',
//           message: 'required'
//         })
//       }
//       return errors
//     }
//   },
//   asset: {
//     val: false,
//     on: {
//       data (data) {
//         this.parent.makeRequest()
//       }
//     }
//   },
//   logId: {
//     val: false,
//     on: {
//       data (data) {
//         this.parent.makeRequest()
//       }
//     }
//   }
// })

// var sendEventApi = sendEvent
// var sendEventConfig = config.sendEvent

// sendEventApi.set({
//   inject: sendEventConfig,
//   properties: {
//     eventData: true
//   },
//   eventData: false,
//   define: {
//     makeRequest () {
//       var url = getSourceConfig.url
//       if (this.asset.val) {
//         url += this.asset.val
//         if (!this.loading.val) {
//           this.url = url
//           this.request()
//         }
//       }
//     },
//     build () {
//       return this.eventData
//     },
//     validate () {
//       // scheck if this.logData is complete
//       // TODO: validate event body required props
//     }
//   },
//   asset: {
//     val: false,
//     on: {
//       data (data) {
//         this.parent.makeRequest()
//       }
//     }
//   }
// })

module.exports.getSource = getSourceApi
// module.exports.sendPlayback = sendPlaybackApi
// module.exports.sendEvent = sendEventApi
