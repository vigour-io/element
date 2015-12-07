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
  switcher : new Switcher
})



var container = new Element({
  text:'1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26',
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
      app.switcher.emit('changeto' , [this, container2, 'right', 1000])
    }
  }
}).Constructor

var Container2 = new Element({
  text:'1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26',
  css: 'container2',
  on:{
    transitionEnd () {
      console.log('remove container 2')
      this.remove()
    },
    click () {
      console.log('clicked back')
      var container1 = new container
      app.switcher.emit('changeto', [this, container1, 'left', 1000])
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

// app.switcher.set({animationType: 'switchto'})

// console.log('HAHAHA',document.elementFromPoint(100,100))
// setInterval(function(){
//   document.elementFromPoint(100,100).base.emit('click')
// },2000)
