require('./style.less')

var app = require('../../lib/app')
var Element = require('../../lib/element')

Element.prototype.inject(
  require('../../lib/property/text'),
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/scroll/top'),
  require('../../lib/property/scroll/left'),
  require('../../lib/property/transform'),
  require('../../lib/events/click'),
  require('../../lib/property/opacity')
)

var Observable = require('vjs/lib/observable')
var Property = require('../../lib/property')

var n = 10000

var thing = new Element({
  properties: {
    bla: Observable,
    color: new Property({
      on: {
        data: function() {
          var val = this.val
          var r, g, b
          // val = val
          // this.parent.text.val = (Math.cos(val)*255+255)/2
          r = ~~((Math.sin(val/50)*255+255)/2)
          g = ~~((Math.cos(val/100)*255+255)/2)
          b = 10
          // b = ~~((Math.cos(val/100)*255+255)/2)
          this.parent.node.style.backgroundColor = 'rgb('+[r,g,b].join(',')+')'
        }
      }
    })
  },
  css: 'info',
  // text: 'not bound',
  // color: 0,
  opacity: {
    $transform: function(val) {
      return Math.floor((val+n)/n)
    }
  },
  y:0,
  x: {
    val: 20,
    // val: function() {
    //   //this is the next test
    //   return this.parent.key
    // },
    // $animation: 2
    // on: {
    //   transitionEnd: function() {
    //     // setTimeout(function() {
    //     //   thing.x.val = Math.random()*300
    //     // })
    //   }
    // }
    // on: {
    //   data: function() {
    //     console.error('ok data update', this.path)
    //   }
    // }
  }
  // text: {
  //   on: {
  //     parent: function (parent, event) {
  //       //does not work with useval?
  //       console.log('parent anyone? does not seem to work...', parent.key)
  //       this.set( parent.key, event )
  //     }
  //   }
  // }
})

// the slowness is the context lookup sitution
// cache context lookups maybe?
console.clear()



var test = new Observable({
  trackInstances: true,
  cnt: {
    val: 1,
    inject: require('vjs/lib/operator/all'),
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

// console.log('thi')

for(var i = 0 ; i < n; i++) {
  holder.setKey(i, new thing.Constructor({
    text: ins[i].cnt,
    color: ins[i].cnt
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
  window.requestAnimationFrame(function() {
    var t = Date.now()
    loop()
    // console.clear()
    // console.log('timed update test on data', (Date.now()-t)/1000, 's')
    doTimed()
  })
}



// doTimed()
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


// doTimed()

var t = Date.now()

var a = new Observable()

for(var i = 0 ; i < n ; i++) {
  ins[i].val = a
}

console.log('add ref listeners', (Date.now()-t)/1000, 's', ~~(n/1000) + 'k')


var t = Date.now()

var a = new Observable()

for(var i = 0 ; i < n ; i++) {
  a.on(function(){})
}
console.log('add listeners', (Date.now()-t)/1000, 's', ~~(n/1000) + 'k')
