'use strict'

require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib/element')

var App = require('../../lib/app')
var app = new App({
  node: document.body
})

var Property = require('../../lib/property')

Property.prototype.inject(
  require('../../lib/animation'),
  require('vigour-js/lib/operator/subscribe')
)

Element.prototype.inject(
  require('../../lib/property/text'),
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/scroll/top'),
  require('../../lib/property/scroll/left'),
  require('../../lib/property/transform'),
  require('../../lib/events/click')
)

// test properties
var TestElem = new Element({
  text: 'nothing',
  properties: {
    state: new Observable({
      on: {
        data () {
          this.parent.text.val = this.val
        }
      }
    })
  }
}).Constructor

app.set({
  test: new TestElem({
    state: 1
  })
})
