'use strict'
var Element = require('../../lib/element')
var Event = require('vigour-js/lib/event')
var Observable = require('vigour-js/lib/observable')
var App = require('../../lib/engine/dom')
require('./style.less')
// ******************** CONFIG ********************
var n = 1e3
// ************************************************

var app = new App()
// var str = new StringApp()
var Thing = new Element({
  css: 'thing',
  text: function () {
    return this._context._input
  },
  img: {
    type: 'img',
    src: 'http://vignette1.wikia.nocookie.net/scarface/images/4/44/Tony_Montana.jpg/revision/latest/scale-to-width-down/300?cb=20120604034628&path-prefix=en'
  },
  bla: {
    text: function () {
      return this._context._input
    }
  },
  x: {
    text: function () {
      return this._context._input
    }
  },
  xx: {
    text: function () {
      return this._context._input
    }
  },
  xxx: {
    text: function () {
      return this._context._input
    }
  }
}).Constructor
var holder = new Element({
  css: 'holder',
  '0': {
    type: 'h1',
    text: n
  }
})
global.obs = new Observable({
  define: {
    updateAll () {
      console.time('update')
      var ev = new Event()
      this.each(function (p) {
        p.set(Math.random() * 99, ev)
      })
      ev.trigger()
      console.timeEnd('update')
    }
  }
})
// var event = new Event(holder, 'data')
for (let i = 1; i < n + 1; i++) {
  global.obs.setKey(i, i)
  let a = global.obs[i]
  holder.setKey(i, new Thing({
    text: a,
    bla: {
      text: a
    },
    x: {
      text: a
    },
    xx: {
      text: a
    },
    xxx: {
      text: a
    }
  }, false), false)
}

app.set({
  cnodes: new Element({
    text: 'yo'
  }),
  nodes: new Element({
    text: 'yo'
  }),
  holder: new holder.Constructor(),
  holder2: new holder.Constructor()
})

var globals = require('../../lib/engine/dom/globals')

global.app = app
global.nodes = globals.nodes

app.cnodes.text.val = 'cnodes: ' + Object.keys(globals.cnodes).join(', ')
app.nodes.text.val = 'nodes: ' + Object.keys(globals.nodes).join(', ')

// console.log('---------------')
// obs[1].val = 222222
app.holder.set({
  bla: {
    text: 'yo!'
  },
  yuz: {
    type: 'img',
    src: 'http://vignette1.wikia.nocookie.net/scarface/images/4/44/Tony_Montana.jpg/revision/latest/scale-to-width-down/300?cb=20120604034628&path-prefix=en'
  }
})

// do we want to support this -- probably yesh?
Thing.prototype.set({
  yuz: {
    type: 'img',
    src: 'http://vignette1.wikia.nocookie.net/scarface/images/4/44/Tony_Montana.jpg/revision/latest/scale-to-width-down/300?cb=20120604034628&path-prefix=en'
  }
})

// Thing.prototype.yuz.remove()
// app.holder.yuz.remove()
console.time(1)
app.holder.remove(false)
console.timeEnd(1)