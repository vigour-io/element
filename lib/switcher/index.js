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

var switcher = new Element({
  width:400,
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
        if(this._direction === 'left'){
          this._currentElement.setKey('x', this._currentElement.x.val - this.width.val)
        } else if(this._direction === 'right'){
          this._currentElement.setKey('x', this._currentElement.x.val + this.width.val)
        }
        this._currentElement.x.$animation.set({
          duration : this._duration
        })
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

        this._currentElement.node.classList.add('show')
        this._currentElement.node.classList.add('hide')
        console.log(this._duration)
        this._currentElement.node.style.webkitTransitionDuration = this._duration
        setTimeout( () => {
          this._currentElement.remove()
        }, this._duration)

      }
    },
    add (params) {
      if(params[1]) {
        var current = params[1]
        var next = params[0]
        var key

        if(current.key==="0") {
          next.set({
            insertBefore:0
          })
          key = 1
        }
        else{
          next.set({
            insertBefore:1
          })
          key = 0
        }

       this.set({
         [key]: next
        })

      }else {
        this.set(params)
      }
    }
  },
})

module.exports = switcher.Constructor
