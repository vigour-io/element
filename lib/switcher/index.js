'use strict'

var Element = require('../../lib/element')
var Property = require('../../lib/property')

Property.prototype.inject(
  require('../../lib/animation')
)

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

var App = require('../app')
var app = new App

var Switcher = new Element({
  width:420,
  on:{
    switchto: {
      animate (params) {
        this._lastElem = params[0]
        this._type = params[1]
        this._direction = params[2]
        this._duration = params[3]

        if(this._type === 'transition') {
          if(this._direction === 'left'){
            this._lastElem.setKey('x', this._lastElem.x.val - this.width.val)
          } else if(this._direction === 'right'){
            this._lastElem.setKey('x', this.width.val + this._lastElem.x.val)
          }
          this._lastElem.x.$animation.set({
            duration : this._duration
          })
        }
      }
    }
  }
})

app.set({
  switcher : Switcher
})
