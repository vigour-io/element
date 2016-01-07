'use strict'
global.debug = require('vigour-js/lib/util/debug')

var app = global.app = require('../../lib/app')

var Element = require('../../')
var Observable = require('vigour-js/lib/observable')

// for element
var Test = new Element({
  sibling: {},
  next: {}
}).Constructor

var Holder = new Element({
  switcher: new Test()
}).Constructor

// same for observable
var ObsChild = new Observable({
  sibling: {},
  thing: {}
}).Constructor

var obs = new Observable({
  child: {
    useVal: new ObsChild()
  }
})

app.set({
  buttons: {
    ChildConstructor: new Element({
      node: 'button',
      h: 100
    }),
    holder: {
      style: {
        border: '5px solid red'
      },
      text: 'APP ELEMENT WITH SIBLING',
      on: {
        click () {
          app.holder.switcher.next.set(Math.random())
          debug.context(app).log('app element with sibling')
        }
      }
    },
    obs: {
      style: {
        border: '5px solid green'
      },
      text: 'OBS WITH SIBLING',
      on: {
        click () {
          obs.child.thing.set(Math.random())
          debug.context(app).log('observable with sibling')
        }
      }
    }
  },
  holder: new Holder()
})
