'use strict'
var Property = require('./')
var ua = require('../ua')
var PREFIX = ua.prefix
var TRANSITION = PREFIX + 'Transition'
var DEFPROPERTY = 'transitionProperty'
var PROPERTY = TRANSITION + 'Property'
var DURATION = TRANSITION + 'Duration'
var TIMING = TRANSITION + 'TimingFunction'
var DELAY = TRANSITION + 'Delay'

exports.properties = {
  transition: new Property({
    render () {},
    property: {
      render (val, properties, children) {
        style(properties, PROPERTY, val === 'transform' ? PREFIX + '-transform' : val)
        style(properties, DEFPROPERTY, val)
      }
    },
    duration: {
      val: '0.3s',
      render (val, properties, children) {
        if (typeof val === 'number') {
          val += 'ms'
        }
        style(properties, DURATION, val)
      }
    },
    timing: {
      render (val, properties, children) {
        style(properties, TIMING, val)
      }
    },
    delay: {
      render (val, properties, children) {
        style(properties, DELAY, val)
      }
    }
  })
}

function style (properties, style, val) {
  if (!properties.style) {
    properties.style = {}
  }
  properties.style[style] = val
}
