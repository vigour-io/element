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
  require('../../lib/property/attributes'),
  require('../../lib/property/transition'),
  require('../../lib/property/css'),
  require('../../lib/property/draggable'),
  require('../../lib/property/size'),
  require('../../lib/events/drag'),
  require('../../lib/animation')
)
app.set({
  select:{
    button1:{
      css:'buttons',
      node:'button',
      text:'SwitchTo',
      on: {
        click() {
          this.node.className = "selected buttons"
          this.parent.button2.node.className = "buttons"
          this.parent.button3.node.className = "buttons"
          this.parent.parent.switcher.set({animationType: 'switchto'})
        }
      }
    },
    button2:{
      css:'buttons',
      node:'button',
      text:'fadeTo',
      on: {
        click() {
          this.node.className = "selected buttons"
          this.parent.button1.node.className = "buttons"
          this.parent.button3.node.className = "buttons"
          this.parent.parent.switcher.set({animationType: 'fadeto'})

        }
      }
    },
    button3:{
      css:'buttons',
      node:'button',
      text:'changeTo',
      on: {
        click() {
          this.node.className = "selected buttons"
          this.parent.button1.node.className = "buttons"
          this.parent.button2.node.className = "buttons"
          this.parent.parent.switcher.set({animationType: 'changeto'})
        }
      }
    }
  },
  switcher : new Switcher
})
var container = new Element({
  css:'container',
    x:{
    val:0,
    $animation:{
      duration:0
    }
  },
  y:{
    val:0,
    $animation:{
      duration:0
    }
  },
  on:{
    transitionEnd () {
      console.log('removed container 1')
      this.remove()
    },
    click () {
      console.log('clicked back new')
      var container2 = new Container2
      app.switcher.emit(this.parent.animationType.val , [this, container2, 'left', 500])
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
      app.switcher.emit(this.parent.animationType.val , [this, container1, 'right', 500])
    }
  },
  x:{
    val:0,
    $animation:{
       duration:0
    }
  },
  y:{
    val:0,
    $animation:{
       duration:0
    }
  }
}).Constructor
app.switcher.emit('add',[null,{'1': new container}])
