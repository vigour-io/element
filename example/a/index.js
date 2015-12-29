'use strict'
var Element = require('../../lib/element')
var Event = require('vigour-js/lib/event')
var Observable = require('vigour-js/lib/observable')
var App = require('../../lib/engine/dom')
require('./style.less')
// ******************** CONFIG ********************
var n = 2
// ************************************************
var app = new App()
global.app = app
// use nodes combined with context to check up your shit
var Title = new Element({
  type: 'h3',
  text: 'yo'
}).Constructor

// var str = new StringApp()
var Thing = new Element({
  css: 'thing',
  // text: function () {
  //   return this._context._input
  // },
  img: {
    type: 'img',
    src: 'http://vignette1.wikia.nocookie.net/scarface/images/4/44/Tony_Montana.jpg/revision/latest/scale-to-width-down/300?cb=20120604034628&path-prefix=en'
  },
  on: {
    click (data, event) {
      console.log('parent Thing >>>>', this._path, event)
      // ev.target usen? // data something?
      this.getNode().style.border = (Math.random() * 3 + 1) + 'px solid blue'
    }
  },
  theText: {
    text: 'MURDER KAPOT!',
    on: {
      click (ev, event) {
        console.log('YO YO YO', this.path)
        this.text.set(Math.random() * 999, event)
      }
    }
  },
  title: new Title({
    text: function () {
      return this.parent.val
    },
    on: {
      click (data, event) {
        // console.log('nested bla >>>>>>', this._path)
        // this.emit('flabber', void 0, event)
        this.getNode().style.border = (Math.random() * 3 + 1) + 'px solid red'
      },
      flabber (data, event) {
        console.log('FLABBER', this.path, data, event)
      }
    }
  })
  // x: {
  //   text: function () {
  //     return this._context._input
  //   }
  // },
  // xx: {
  //   text: function () {
  //     return this._context._input
  //   }
  // },
  // xxx: {
  //   text: function () {
  //     return this._context._input
  //   }
  // }
}).Constructor

Thing.prototype.title.on('data', function () {
  var node = this.getNode()
  // console.log('yes here')
  if (node) {
    // console.log('yes here go render')
    this.text.render(node)
  }
})

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
    title: a
  }, false), false)
}

app.set({
  cnodes: new Element({
    text: 'yo'
  }),
  buttonx: new Element({
    type: 'button',
    text: '!!!!!!',
    on: {
      click () {
        console.log('!!!')
      }
    }
  }),
  nodes: new Element({
    text: 'yo'
  }),
  bla: new Element({
    css: 'bla',
    holder: {
      type: 'pre',
      text: 'yeey'
    }
  }),
  holder: new holder.Constructor({ '0': { text: 'number 1 holder' } }),
  holder2: new holder.Constructor()
})

var globals = require('../../lib/engine/dom/globals')

global.app = app
global.nodes = globals.nodes

// app.cnodes.text.val = 'cnodes: ' + Object.keys(globals.cnodes).join(', ')
// app.nodes.text.val = 'nodes: ' + Object.keys(globals.nodes).join(', ')

// console.log('---------------')
// obs[1].val = 222222
// app.holder.set({
//   bla: {
//     text: 'yo!'
//   },
//   yuz: {
//     type: 'img',
//     src: 'http://vignette1.wikia.nocookie.net/scarface/images/4/44/Tony_Montana.jpg/revision/latest/scale-to-width-down/300?cb=20120604034628&path-prefix=en'
//   }
// })

// do we want to support this -- probably yesh?
// Thing.prototype.set({
//   yuz: {
//     type: 'img',
//     src: 'http://vignette1.wikia.nocookie.net/scarface/images/4/44/Tony_Montana.jpg/revision/latest/scale-to-width-down/300?cb=20120604034628&path-prefix=en'
//   }
// })
// Thing.prototype.yuz.remove()
// app.holder.yuz.remove()
console.time(1)
console.timeEnd(1)

setInterval(function () {
  app.bla.holder.text.val = global.activeContexts.toString()
  app.bla.inject(require('../../lib/property/scroll'))
})