'use strict'
var render = require('./render')
// var ua = require('../../ua')
// var PREFIX = ua.prefix
// var TRANSITION = PREFIX + 'Transition'

exports.properties = {
  transition: {
    type: 'property',
    // dom: TRANSITION, // need this for compares ofcourse
    define: {
      compare () {}
    },
    render () {},
    Child: {
      type: 'style'
    },
    properties: {
      property: {
        render (val, properties, children) {
          render.property(val, properties, children)
        }
      },
      duration: {
        val: '0.3s',
        render (val, properties, children) {
          render.duration(val, properties, children)
        }
      },
      timing: {
        render (val, properties, children) {
          render.timing(val, properties, children)
        }
      },
      delay: {
        render (val, properties, children) {
          render.delay(val, properties, children)
        }
      }
    },
    duration: '0.3s'
  }
}
