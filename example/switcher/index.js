'use strict'

console.clear()

require('./style.less')

var Element = require('../../lib/element')
var Property = require('../../lib/property')

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
  require('../../lib/property/transition'),
  require('../../lib/property/draggable'),
  require('../../lib/events/drag'),
  require('../../lib/animation')
)


app.set({
  container1:{
    back:{
      node:'button',
      text:'back'
    }
  },
  container2:{

  },
   container3:{

  }
})
