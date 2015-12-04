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

var directions = require('./directions')

var switcher = new Element({
  width:400,
  height:500,
  on:{
    switchto: {
      animate (params) {
        this._currentElement = params[0]
        this._nextElement = params[1] || null
        this._direction = params[2]
        this._duration = params[3]

        if (this._nextElement) {
          this.emit('add', [this._nextElement, this._currentElement])
        }
        direction[this._direction](this._currentElement, this, this._duration)
      }
    },
    fadeto: {
      fade (params) {
        this._currentElement = params[0]
        this._nextElement = params[1] || null
        this._duration = params[3]

        if (this._nextElement) {
          this.emit('add', [this._nextElement, this._currentElement])
        }

        // refactor this ask niks
        this._currentElement.node.style.webkitTransitionDuration = this._duration
        this._currentElement.node.classList.add('show')
        this._currentElement.node.classList.add('hide')

        setTimeout( () => {
          this._currentElement.remove()
        }, this._duration)
      }
    },
    changeto: {
      change (params) {
        params[3] = 0
        this.emit('fadeto',params)
      }
    },
    add (params) {
      if(params[0]) {
        var next = params[0]
        var current = params[1]
        var key
        if(current.key==="1") {
          next.set({
            insertBefore:1
          })
          key = 2
        }
        else{
          next.set({
            insertBefore:2
          })
          key = 1
        }

      if(this[key]){
        this[key].remove()
      }
       this.set({
         [key]: next
        })

      }else {
        this.set(params[1])
      }
    }
  },
})

module.exports = switcher.Constructor
