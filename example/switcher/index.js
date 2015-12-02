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
  require('../../lib/property/text'),
  require('../../lib/property/transition'),
  require('../../lib/property/draggable'),
  require('../../lib/events/drag'),
  require('../../lib/animation')
)

var Switcher = new Element({
  width:420,
  on:{
    switchto: {
      test (params) {
        this._lastElem = params[0]
        this._type = params[1]
        this._direction = params[2]
        this._duration = params[3]

        if(this._type === 'transition') {
          if(this._direction === 'left'){
            this._lastElem.setKey('x', this._lastElem.x.val - this.parent.switcher.width.val)
          } else if(this._direction === 'right'){
            this._lastElem.setKey('x', this._lastElem.x.val + this.parent.switcher.width.val)
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
  switcher : Switcher,
  container1:{
     on:{
      transitionEnd () {
        console.log('remove')
      }
    },
    x:{
      val:0,
      $animation:{

      }
    }
  },
  container2:{

  },
  back:{
    node:'button',
    text:'back',
    on: {
      click () {
        console.log('clicked back')
        this.parent.switcher.emit('switchto', [ this.parent.container1,'transition', 'left', 100]) //Also animation types (opacity, transiction)
      }
    }
  },
  front:{
    node:'button',
    text:'front',
    on: {
      click () {
        console.log('clicked front')
        this.parent.switcher.emit('switchto', [ this.parent.container1,'transition', 'right', 100]) //Also animation types (opacity, transiction)
      }
    }
  }
})

