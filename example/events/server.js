// fix later
var http = require('http')
http.createServer(function (req, res) {
  var str = '<html>'
  str += '<link href="http://localhost:8104/bundle.css?$app=192.168.0.12:8104/example/subscribe/todoraggen.js" rel="stylesheet" type="text/css">'
  str += app.val
  str += '</html>'
  res.end(str)
}).listen(3031)