// var jsdom = require('jsdom')

console.log('start server')

var Property = require('../../lib/property')
var App = require('../../lib/app')

var Element = require('../../lib/element/')
Element.prototype.inject(
  require('../../lib/property/text'),
  require('vigour-js/lib/methods/serialize'),
  require('vigour-js/lib/methods/plain')

)

var bla = new Element({
  a: {},
  text: 'aaaa'
})


var g = new App({
  a: new bla.Constructor()
})

// console.log

function parse(property, key) {
  var output = key ? '<div class="'+key+'">'  : '<div>'
  property.each(function(property, key) {
    if(property instanceof Property) {
      output += property.val
    } else if(property instanceof Element) {
      output += parse(property, key)
    } else {
      return false
    }
  }, function() {
    return true
  })
  output+='</div>'
  return output
}


var http = require('http')

var exampleApp = require('../../examples/animnewoperator/100k')
var parsed = parse(exampleApp)


http.createServer(function(req, res) {
  //parse it in chunks send chunks
  // var t = Date.now()
  // console.log('handle req', (Date.now()-t)/1000 + ' s rendering')
  // console.log('lezzgo', parsed)
  res.end(parsed)
}).listen(3030)
