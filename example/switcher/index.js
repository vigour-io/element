'use strict'

console.clear()
var count = 0
require('./style.less')

var Element = require('../../lib/element')
var Property = require('../../lib/property')
var Switcher = require('../../lib/switcher')

Property.prototype.inject(
  require('../../lib/animation')
)

var App = require('../../lib/app')
var app = new App({
  node: document.body
})

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/transform'),
  require('../../lib/property/opacity'),
  require('../../lib/property/text'),
  require('../../lib/property/transition'),
  require('../../lib/property/css'),
  require('../../lib/property/draggable'),
  require('../../lib/property/size'),
  require('../../lib/events/drag'),
  require('../../lib/animation')
)
app.set({
  switcher : new Switcher
})
var Container1 = new Element({
  css:'container1',
  firstOption:{
    button1:{
      node : 'button',
      text:'Language'
    }
  },
  on:{
    transitionEnd () {
      console.log('removed container 1')
      this.remove()
    },
    click () {
      console.log('clicked back new')
      var a = new Container2
      app.switcher.emit('switchto', [this, a,'transition', 'left', 30]) //Also animation types (opacity, transiction)
    }
  },
  x:{
    val:0,
    $animation:{

    }
  }
}).Constructor

var Container2 = new Element({
  css: 'container2',
  firstOption:{
    button1:{
      node : 'button',
      text:'English'
    }
  },
  on:{
    transitionEnd () {
      console.log('remove')
      this.remove()
    },
    click () {
      console.log('clicked back')
      var a = new Container2
      app.switcher.emit('switchto', [this, new Container1,'transition', 'left', 30]) //Also animation types (opacity, transiction)
    }
  },
  x:{
    val:0,
    $animation:{

    }
  }
}).Constructor

app.switcher.emit('add',{container2:new Container2})

