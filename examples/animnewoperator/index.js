// require('./style.less')

// handle style require in node

var App = require('../../lib/app')
var Element = require('../../lib/element')

var app = module.exports = new App()

Element.prototype.inject(
  require('../../lib/property/text')
  // require('../../lib/property/css'),
  // require('../../lib/property/size'),
  // require('../../lib/property/scroll/top'),
  // require('../../lib/property/scroll/left'),
  // require('../../lib/property/transform')
  // require('../../lib/events/click'),
  // require('../../lib/property/opacity')
)

<<<<<<< HEAD
var Bla = new Element({
  key: 'bla'
}).Constructor

var thing = new Element({
  css: 'thing',
  x: { val: 20, $animation: 20 },
  text: 'a'
})

// app.set({
//   a: new thing.Constructor(),
//   b: new thing.Constructor(),
//   c: new thing.Constructor()
// })

var n = 4e2
for (let i = 0; i < n; i++) {
  app.setKey( i, new thing.Constructor() )
}

// app.set({
//   // text: app.a.x.val
// })
=======
var Observable = require('vigour-js/lib/observable')
var Property = require('../../lib/property')

var n = 1e3

var thing = new Element()

// the slowness is the context lookup sitution
// cache context lookups maybe?
// console.clear()



var test = new Observable({
  trackInstances: true,
  cnt: {
    val: 1,
    inject: require('vigour-js/lib/operator/all'),
    // on: {
    //   data: function () {
    //     this.val
    //   }
    // }
  }
})

var t = Date.now()


var Test = test.Constructor

//lookups are slow
var ins = []
for(var i = 0 ; i < n; i++) {
  //resolving context is extrorodinary slow!
  ins.push(new Test({ cnt:i }))
}

// test.cnt.val++

console.log('create test data', (Date.now() - t) / 1000 + ' s')

var t = Date.now()

var holder = new Element()

console.log('thiz ')

for(var i = 0 ; i < n; i++) {
  holder.setKey(i, new thing.Constructor({
    text: ins[i].cnt
    // color: ins[i].cnt
  }))
}


// a
/*

  a.val = b

  --> b.on('data', a)



 */

console.log('create elements', (Date.now()-t)/1000, 's', ~~(n/1000) + 'k')


//
// var t = Date.now()
//
// // updating class value while its overwritten is giving very strange results!
// // test.cnt.val++
//
// for (var i = 0;i < n;i++) {
//   // console.log(app[i])
//   // app[i].x.val = ins[i].cnt
//   // app[i].x.val = Math.sin(i/100)*50
//   // app[i].y.val = Math.sin(i/100)*50
//   // app[i].color.val = ins[i].cnt
//   // console.log(i, app[i].text)
//   holder[i].text.val = ins[i].cnt
//   // app[i].opacity.val = ins[i].cnt
// }
//
// console.log('attach to elements (and update elements)', (Date.now()-t)/1000, 's', ~~(n/1000) + 'k', test.cnt.val)
//

// setInterval(function() {
//   for(var i = 0;i<n;i++) {
//     ins[i].cnt.val++
//   }
// },50)
var t = Date.now()

app.set({ holder: holder })
console.log('attach holder', (Date.now()-t)/1000, 's')

var cnt = 0
function loop () {
  cnt++
  // cnt = ~~(Math.random() * 10)
  for (var i = 0 ; i < n; i++) {
    ins[i].cnt.val = cnt * 10 + i
  }
}

function doTimed() {
  setTimeout(function() {
    var t = Date.now()
    loop()
    // console.clear()
    // console.log('timed update test on data', (Date.now()-t)/1000, 's')
    doTimed()
  })
}



doTimed()
//
var a = new Observable({
  b:{}
})

a.on('property', function( data, event ) {
  console.warn( data )
})
// a.subscribe('valerio', fn)
a.b.subscribe({
  $up: {
    valerio: true   //['true', 'data', 'entry']
  }
}, function() {
  console.error('zzzzzz')
})


a.set({
  valerio: true
})
>>>>>>> feature/Animation


// doTimed()

// var t = Date.now()
//
// var a = new Observable()
//
// for(var i = 0 ; i < n ; i++) {
//   ins[i].val = a
// }
//
// console.log('add ref listeners', (Date.now()-t)/1000, 's', ~~(n/1000) + 'k')
//
//
// var t = Date.now()
//
// var a = new Observable()
//
// for(var i = 0 ; i < n ; i++) {
//   a.on(function(){})
// }
// console.log('add listeners', (Date.now()-t)/1000, 's', ~~(n/1000) + 'k')


// this does not work ofc
// app.set({ node: document.body })

console.log('wtf???', app.node)
// document.body.appendChild(app.node)

var ReactDOM = require('react-dom')
//
ReactDOM.render(
  app.node,
  document.body
);

// var ReactDOMServer = require('react-dom')

// var ReactDOMServer = require('react-dom/server')

var exampleApp = require('../../examples/animnewoperator/100k')
// var parsed = parse(exampleApp)


// var http = require('http')
//
// http.createServer(function(req, res) {
//   res.end(ReactDOMServer.renderToString(app.node))
// }).listen(3030)
