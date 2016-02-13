'use strict'
var StyleProp = require('../style')
var Property = require('../')
var render = require('./render')

exports.properties = {
  transition: new Property({
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
