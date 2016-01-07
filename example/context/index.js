'use strict'
global.debug = require('vigour-js/lib/util/debug')

var app = global.app = require('../../lib/app')

var Element = require('../../')
var Observable = require('vigour-js/lib/observable')

// for element
var Test = new Element({
  next: {}
}).Constructor

var Holder = new Element({
  switcher: new Test()
}).Constructor

// same for observable
var ObsChild = new Observable({
  thing: {}
}).Constructor

var obs = new Observable({
  child: {
    useVal: new ObsChild()
  }
})

var holder = new Holder()

app.set({
  buttons: {
    ChildConstructor: new Element({
      node: 'button',
      h: 100
    }),
    shows: {
      text: 'app.holder.switcher.next.set(Math.random())',
      on: {
        click () {
          app.holder.switcher.next.set(Math.random())
          debug.context(app).log('set app...next:')
        }
      }
    },
    holder: {
      text: 'holder.switcher.next.set(Math.random())',
      on: {
        click () {
          holder.switcher.next.set(Math.random())
          debug.context(app).log('set holder...next:')
        }
      }
    },
    obs: {
      text: 'obs.child.thing.set(Math.random())',
      on: {
        click () {
          obs.child.thing.set(Math.random())
          debug.context(app).log('set obs...thing:')
        }
      }
    }
  },
  holder: new Holder()
})
