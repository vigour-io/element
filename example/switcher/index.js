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
  switcher : new Switcher,
  switcher2 : new Switcher
})
var container = new Element({
  css:'container',
  on:{
    transitionEnd () {
      console.log('removed container 1')
      this.remove()
    },
    click () {
      console.log('clicked back new')
      var container2 = new Container2
      app.switcher.emit('fadeto', [this, container2, 'left', 1000]) //Also animation types (opacity, transiction)
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
  on:{
    transitionEnd () {
      console.log('remove')
      this.remove()
    },
    click () {
      console.log('clicked back')
      var container1 = new container
      app.switcher.emit('fadeto', [this, container1, 'right', 1000]) //Also animation types (opacity, transiction)
    }
  },
  x:{
    val:0,
    $animation:{

    }
  }
}).Constructor

var containerex = new Element({
  css:'container',
  on:{
    transitionEnd () {
      console.log('removed container 1')
      this.remove()
    },
    click () {
      console.log('clicked back new')
      var container2 = new Container2ex
      app.switcher2.emit('switchto', [this, container2, 'left', 60]) //Also animation types (opacity, transiction)
    }
  },
  x:{
    val:0,
    $animation:{

    }
  }
}).Constructor

var Container2ex = new Element({
  css: 'container2',
  on:{
    transitionEnd () {
      console.log('remove')
      this.remove()
    },
    click () {
      console.log('clicked back')
      var container1 = new containerex
      app.switcher2.emit('switchto', [this, container1, 'right', 60]) //Also animation types (opacity, transiction)
    }
  },
  x:{
    val:0,
    $animation:{

    }
  }
}).Constructor

app.switcher.emit('add',{0: new container})
app.switcher2.emit('add',{0: new containerex})
