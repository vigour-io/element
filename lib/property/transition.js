'use strict'
var StyleProp = require('./style')
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
    properties: {
      property: new StyleProp({
        render (val, properties, children) {
          properties.style[PROPERTY] = val === 'transform' ? PREFIX + '-transform' : val
          properties.style[DEFPROPERTY] = val
        }
      }),
      duration: new StyleProp({
        val: '0.3s',
        render (val, properties, children) {
          if (typeof val === 'number') {
            val += 'ms'
          }
          properties.style[DURATION] = val
        }
      }),
      timing: new StyleProp({
        render (val, properties, children) {
          properties.style[TIMING] = val
        }
      }),
      delay: new StyleProp({
        render (val, properties, children) {
          properties.style[DELAY] = val
        }
      })
    }
  })
}
