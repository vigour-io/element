'use strict'
var StyleProp = require('../style')
var Property = require('../')
var render = require('./render')
// var ua = require('../../ua')
// var PREFIX = ua.prefix
// var TRANSITION = PREFIX + 'Transition'

exports.properties = {
  transition: new Property({
    // dom: TRANSITION,
    define: {
      compare () {}
    },
    render () {},
    properties: {
      property: new StyleProp({
        render (val, properties, children) {
          render.property(val, properties, children)
        }
      }),
      duration: new StyleProp({
        val: '0.3s',
        render (val, properties, children) {
          render.duration(val, properties, children)
        }
      }),
      timing: new StyleProp({
        render (val, properties, children) {
          render.timing(val, properties, children)
        }
      }),
      delay: new StyleProp({
        render (val, properties, children) {
          render.delay(val, properties, children)
        }
      })
    },
    duration: '0.3s'
  })
}
