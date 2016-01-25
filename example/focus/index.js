'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor
var Property = require('vigour-element/lib/property')

require('./style.less')

var focus = new Observable({
  define:{
    setKey () {

    }
  },
  ChildConstructor: 'Constructor'
})

Element.prototype.define({
  focus (scope) {
    focus.setKey(scope, this)
  }
})

app.set({
  inject: require('vigour-element/lib/event/key'),
  ChildConstructor: new Element({
    text () {
      return this.parent.key
    }
  }),
  one: {},
  two: {},
  three: {},
  four: {},
  on: {
    arrowdown () {
      console.error('succes!!')
    }
  }
})

app.one.focus('highlight')

setTimeout(function () {
  app.two.focus('highlight')  
}, 1000)

