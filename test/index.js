'use strict'

console.log('yo yo yo')

var e = require('../e')

var fakeDom = {}

// do this with a conditional require or something
var app = e({
  bla: {
    text: 'geinig!',
    gurk: {
      text: 'bla'
    }
  },
  DOM: fakeDom
})

console.log('gurk', app.renderTree)
var toHTML = require('vdom-to-html')

var http = require('http')

var server = http.createServer((req,res) => {
  res.setHeader('Content-Type', 'text/html')
  res.writeHead(200, {'Content-Type': 'text/html'})
  var str = '<html><head></head><body>' + toHTML(app.renderTree) + '</body></html>'
  res.end(str)
}).listen(3031)