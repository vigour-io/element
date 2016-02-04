'use strict'
var StyleProp = require('./style')
exports.properties = {
  order: new StyleProp({
    $type: 'number',
    render (val, properties, children) {
      properties.style.order = val || 0
    }
  })
}
