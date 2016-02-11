'use strict'
var StyleProp = require('./style')
exports.properties = {
  w: new StyleProp({
    dom: 'width',
    render (val, properties, children) {
      if (val || val === 0) {
        properties.style.width = typeof val === 'string' ? val : val + 'px'
      }
    }
  }),
  h: new StyleProp({
    dom: 'height',
    render (val, properties, children) {
      console.log('HEIGHT:::::', properties.style)
      if (val || val === 0) {
        properties.style.height = typeof val === 'string' ? val : val + 'px'
      }
    }
  })
}
