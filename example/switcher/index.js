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
      app.switcher.emit('fadeto', [this, container2, 'left', 400]) //Also animation types (opacity, transiction)
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
      app.switcher.emit('fadeto', [this, container1, 'right', 400]) //Also animation types (opacity, transiction)
    }
  },
  x:{
    val:0,
    $animation:{

    }
  }
}).Constructor

app.switcher.emit('add',{0: new container})
// app.switcher.emit('add',{container2: new Container2})


// var elem = new Element({
//     label:{
//       node:'div'
//     },
//     child:{}
//   })

//   elem.label.remove()

//   elem.set({
//     label: {
//       insertBefore: 'child',
//       node: 'span'
//     }
//   })


//   app.set({
//     abc: elem
//   })
