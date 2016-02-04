'use strict'
var StyleProp = require('./style')

exports.properties = {
  position: new StyleProp({
    $type: 'string',
    render (val, properties, children) {
      properties.style.position = val
    }
  })
}
