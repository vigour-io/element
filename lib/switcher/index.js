'use strict'
var Observable = require('vigour-js/lib/observable')
var Base = require('vigour-js/lib/base')
var Property = require('../property')
var Element = require('../')
var addNewProperty = Element.prototype.addNewProperty
var raf = global.requestAnimationFrame

module.exports = {
  inject: require('../methods/postpone'),
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
    previous: Observable,
    current: Observable,
    next: new Property({
      define: {
        compare (property, data, props, children, current, prev) {
          if (data) {
            let switcher = property.parent
            let key = makeKey.call(switcher, data)
            if (!switcher[key]) {
              switcher.set({[key]: data})
            }
          }
        }
      },
      render (val) {}
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
}

function setTransition (key, event) {
  var elem = this[key]
  if (elem instanceof Element) {
    let direction = getDirection.call(this, elem)
    let config = this.config
    let axis = config.axis
    let transition = config.transition

    if (transition && this.state) {
      let delta = axis === 'x'
        ? this.w ? this.w.val : window.innerWidth
        : this.h ? this.h.val : window.innerHeight
      let store = elem.storeContext()

      this.each((child, i) => {
        if (i !== key) {
          child.setKey('transition', transition, event)
          child.setKey(axis, -delta * direction, event)
          this.ready = false
        }
      }, isElement)

      this.postpone('switch', function () {
        cleanChildren(this, this.current.val)
      }, transition.duration || 300)

      elem.setKey(axis, delta * direction, event)
      elem.setKey('transition', transition, event)
      elem.setKey('position', 'absolute', event)

      raf(() => {
        raf(() => {
          elem.applyContext(store)
          elem.setKey(axis, 0)
        })
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
  // console.log('clean!')
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
  let key = data.key// || cnt++
  if (this.properties[key]) {
    return key
  } else {
    key = data.path.join('-')// || cnt++
    return key
  }
}

function isElement (prop) {
  return prop instanceof Element
}
