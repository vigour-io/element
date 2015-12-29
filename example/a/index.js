'use strict'
var Element = require('../../lib/element')
var Event = require('vigour-js/lib/event')
var Observable = require('vigour-js/lib/observable')
var App = require('../../lib/engine/dom')
require('./style.less')
// ******************** CONFIG ********************
var n = 1
// ************************************************

var app = new App()
// var str = new StringApp()
var Thing = new Element({
  text: function () {
    return this._context._input
  },
  img: {
    type: 'img',
    src: 'http://vignette1.wikia.nocookie.net/scarface/images/4/44/Tony_Montana.jpg/revision/latest/scale-to-width-down/300?cb=20120604034628&path-prefix=en'
  },
  css: 'titlex',
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
var holder = new Element()
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
for (let i = 0; i < n; i++) {
  obs.setKey(i, i)
  let a = obs[i]
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

var globals = require('../../lib/globals')

global.app = app

app.cnodes.text.val = 'cnodes: ' + Object.keys(globals.cnodes).join(', ')
app.nodes.text.val = 'nodes: ' + Object.keys(globals.nodes).join(', ')

console.log('---------------')
obs[0].val = 222222
