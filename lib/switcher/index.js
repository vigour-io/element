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

var Container1 = new Element({
  firstOption:{
    button1:{
      node : 'button',
      text:'Language'
    }
  },
  on:{
    transitionEnd () {
      console.log('removed container 1')
      this.remove()
    },
    click () {
      console.log('clicked back 1')
      // var a = new Container1
      // this.parent.node.insertBefore(a.node, this.parent.node.children[0])
      this.parent.emit('switchto', [ this, null, 'transition', 'left', 30]) //Also animation types (opacity, transiction)
    }
  },
  x:{
    val:0,
    $animation:{

    }
  }
}).Constructor

var switcher = new Element({
  width:420,
  on:{
    switchto: {
      animate (params) {
        this._currentElement = params[0]
        this._nextElement = params[1] || null
        this._type = params[2]
        this._direction = params[3]
        this._duration = params[4]

        if (this._nextElement){
          this.emit('add', [this._nextElement, this._currentElement])
        }
        if(this._type === 'transition') {
          if(this._direction === 'left'){
            this._currentElement.setKey('x', this._currentElement.x.val - this.width.val)
          } else if(this._direction === 'right'){
            this._currentElement.setKey('x', this._currentElement.x.val + this.width.val)
          }
          this._currentElement.x.$animation.set({
            duration : this._duration
          })
        }
      }
    },
    add (params) {
      if(params[1]){
        var element = params[0]
        var last = params[1]
        this.node.insertBefore(element.node, last.node)
      }else{
        this.set(params)
      }

    }
  },
  container1: new Container1
})

module.exports = switcher.Constructor
