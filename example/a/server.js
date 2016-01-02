// fix later
var http = require('http')
// var App = require('../../lib/engine/string')
// var Element = require('../../lib/element')
// var app = new App({
//     key: 'APP',
//     bla: new Element({ text: 'xxxx' })
// })
var app = require('./index.js')

function make () {
  var str = '<html><head>'
  str += '<link href="http://192.168.0.12:8111/bundle.css?$app=192.168.0.12:8111/example/a/index.js" rel="stylesheet" type="text/css">'
  str += '</head><body>'
  str += app.val
  str += '<script src="http://192.168.0.12:8111/bundle.js?$app=192.168.0.12:8111/example/a/index.js" type="text/javascript"></script>'
  str += '</body></html>'
  return str
}

global.make = make
console.log(make())
// var str = app.val
http.createServer(function (req, res) {
  res.end(make())
}).listen(3031)
