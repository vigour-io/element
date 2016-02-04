'use strict'
require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Base = require('vigour-js/lib/base')
var Property = require('../property')
var Element = require('../')
var addNewProperty = Element.prototype.addNewProperty
var cnt = 0

module.exports = new Element({
  properties: {
    __prevdata: true,
    __history: true,
    ready: { val: true },
    config: new Base({
      properties: {
        direction: true,
        transition: true,
        factor: {
          val: 1
        },
        axis: {
          val: 'x'
        }
      }
    }),
    previous: new Observable(false),
    current: new Observable(false),
    next: new Property({
      render (val, props, children, origin, event) {
        var data = val
        var switcher = this.parent
        if (data && !(data instanceof Element)) {
          let key = makeKey.call(switcher, data)
          if (!switcher[key]) {
            switcher.set({[key]: data})
          }
        }
      }
    })
  },
  config: {},
  define: {
    addNewProperty (key, val, property, event, escape) {
      var ret = addNewProperty.apply(this, arguments)
      setTransition.call(this, key, event)
      return ret
    }
  }
}).Constructor

function setTransition (key, event) {
  var elem = this[key]
  if (elem instanceof Element) {
    let direction = getDirection.call(this, elem)
    let config = this.config
    let axis = config.axis
    let transition = config.transition

    if (transition) {
      let delta = axis === 'x' ? 200 : 100
      let store = elem.storeContext()

      this.each((child, i) => {
        if (i !== key) {
          child.setKey(axis, -delta * direction, event)
          child.setKey('transition', transition, event)
          this.ready = false
        }
      }, isElement)

      this.postpone('switch', function () {
        cleanChildren(this, this.current.val)
      }, transition.duration || 300)

      elem.setKey(axis, delta * direction, event)
      elem.setKey('transition', transition, event)
      elem.setKey('position', 'absolute', event)

      global.requestAnimationFrame(function () {
        elem.applyContext(store)
        elem.setKey(axis, 0)
      })
    } else {
      cleanChildren(this, key)
    }

    let current = this.current
    this.set({
      previous: current && current.val,
      current: key
    }, event)
  }
}

function getDirection (val) {
  var configDirection = this.config.direction
  if (configDirection) {
    return configDirection
  }
  let data = val.origin || val.val && val.val.origin
  let direction
  if (data) {
    if (data.index) {
      let previous = this.__prevdata
      if (previous && previous.index) {
        let prev = previous.index.val
        let curr = data.index.val
        if (prev > curr) {
          direction = -1
        }
      }
    } else if (data.number) {
      let previous = this.__prevdata
      if (previous && previous.number) {
        let prev = previous.number.val
        let curr = data.number.val
        if (prev > curr) {
          direction = -1
        }
      }
    }
  }
  this.__prevdata = data
  return direction || 1
}

function cleanChildren (switcher, current) {
  switcher.each(function (prop, key) {
    if (key != current) {
      prop.remove()
    } else {
      let transition = prop.transition
      if (transition) {
        prop.transition.remove()
      }
    }
  }, isElement)
  switcher.__timer = null
  switcher.ready = true
}

function makeKey (data) {
  if (typeof data === 'string') {
    return data
  }
  let key = data.key || cnt++
  if (this.properties[key]) {
    return key
  } else {
    key = data.path.join('-')
    return key
  }
}

function isElement (prop) {
  return prop instanceof Element
}
