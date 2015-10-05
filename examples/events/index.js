require('./style.less')

var app = require('../../lib/app')
var Element = require('../../lib/element')

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text'),
  require('vjs/lib/methods/lookUp')
)

// Element.prototype.inject(
//   require( '../../lib/events/drag' )
//
// )

var thing = new Element({
  key: 'balls',
  text: 'xxxxxx',
  css: {
    val: 'grey-bg',
    add: ' red-txt '
  },
  twerp: {
    css: {
      val: 'buzz'
    },
    text: 'no way!'
  },
  on: {
    drag: function () {
      this.text.val = Math.random() * 999
    },
    scroll: function () {
      console.log('eventttt scrolll')
    },
    mousedown: function () {
      console.log('HEY')
    },
    click: function () {
      this.node.style.opacity = 0.5
    }
  }
})

var holder = new Element({
  on: {
    scroll: function (argument) {
      console.log('scrollling', arguments)
    }
  }
})

gaston.performance(function () {
  var Thing = thing.Constructor
  for (var i = 0; i < 1e3; i++) {
    holder.setKey(i, new Thing())
  }
  app.set({
    holder: holder
  })
}).done(function () {
  // console.log(arguments[0]*1000 +'ms')
})

// console.clear()

// console.log('before!',holder.text,holder.text.val)

// console.error('does it fire')
// var evObj = document.createEvent('Events')
// evObj.initEvent('mousedown', true, false)
// document.getElementsByClassName('grey-bg red-txt ')[0].dispatchEvent(evObj)
// console.error('?')

// console.log('thing.on.down',thing.on.down)
// console.log('thing.on.mousedown',thing.on.mousedown)
// console.log('------------')
// console.log('app.a.on.down',app.a.on.down)
// console.log('app.a.on.mousedown',app.a.on.mousedown)
// console.log('------------')
// console.log('app.b.on.down',app.b.on.down)
// console.log('app.b.on.mousedown',app.b.on.mousedown)
// console.log('------------')
// console.log('thing.twerp.on.down',thing.twerp.on.down)
// console.log('thing.twerp.on.mousedown',thing.twerp.on.mousedown)
// console.log('------------')
// console.log('app.a.twerp.on.down',app.a.twerp.on.down)
// console.log('app.a.twerp.on.mousedown',app.a.twerp.on.mousedown)
