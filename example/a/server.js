var http = require('http')
require('../../lib/require')
var app = require('./index.js')
var zlib = require('zlib')
var stream = require('stream')
var fs = require('fs')
// var js = 'http://192.168.0.12:8111/bundle.js?$app=192.168.0.12:8111/example/a/index.js'
// var css = 'http://192.168.0.12:8111/bundle.css?$app=192.168.0.12:8111/example/a/index.js'
var js = 'http://localhost:3032/build/build.js'
var css = 'http://localhost:3032/build/build.css'

// finish this and add as a util to element (util/server)

function make (js, css) {
  var str = '<html><head>'
  str += '<link href="' + css + '" rel="stylesheet" type="text/css">'
  str += '</head><body>'
  str += app.val
  str += '<script src="' + js + '" type="text/javascript"></script>'
  str += '</body></html>'
  return str
}

// this is it
http.createServer(function (req, res) {
  var raw = new stream.Readable()
  var jstosend = js
  var csstosend = css
  gzip(req, res, raw)
  // make this into a stream is super easy!
  raw.push(make(jstosend, csstosend))
  raw.push(null)
}).listen(3031)

// file server
http.createServer(function (req, res) {
  var raw = fs.createReadStream(__dirname + req.url)
  gzip(req, res, raw)
}).listen(3032)

function gzip (req, res, raw) {
  var acceptEncoding = req.headers['accept-encoding']
  if (!acceptEncoding) {
    acceptEncoding = ''
  }
  if (acceptEncoding.match(/\bdeflate\b/)) {
    res.writeHead(200, { 'content-encoding': 'deflate' })
    raw.pipe(zlib.createDeflate()).pipe(res)
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    res.writeHead(200, { 'content-encoding': 'gzip' })
    raw.pipe(zlib.createGzip()).pipe(res)
  } else {
    res.writeHead(200, {})
    raw.pipe(res)
  }
}
