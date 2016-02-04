'use strict'
var StyleProp = require('./style')
exports.properties = {
  display: new StyleProp({
    render (val, properties, children) {
      if (val === true) {
        properties.style.display = 'block'
      } else if (typeof val !== 'string') {
        properties.style.display = 'none'
      } else {
        properties.style.display = val
      }
    }
  })
}
