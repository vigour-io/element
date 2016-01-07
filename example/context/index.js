'use strict'
global.debug = require('vigour-js/lib/util/debug')

var app = global.app = require('../../lib/app')

var Element = require('../../')
var Base = require('vigour-js/lib/base')
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

var Obs = new Observable({
  child: {
    useVal: new ObsChild()
  }
}).Constructor

var top = new Observable({
  obs: {
    useVal: new Obs()
  }
})

// another element
var Test2 = new Element({
  properties: {
    next: Base,
    sibling: Base
  },
  sibling: {},
  next: {}
}).Constructor

var Holder2 = new Element({
  switcher: new Test2()
}).Constructor

// add to the app
app.set({
  buttons: {
    ChildConstructor: new Element({
      node: 'button',
      h: 100,
      w: '100%'
    }),
    holder2: {
      style: {
        border: '5px solid blue'
      },
      text: 'APP ELEMENT2 WITH SIBLING',
      on: {
        click () {
          app.holder2.switcher.next.set(Math.random())
          debug.context(app).log('app element with sibling')
        }
      }
    },
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
          top.obs.child.thing.set(Math.random())
          debug.context(app).log('observable with sibling')
        }
      }
    }
  },
  holder: new Holder(),
  holder2: new Holder2()
})
