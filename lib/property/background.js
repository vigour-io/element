'use strict'
var Style = require('./style')
exports.properties = {
  background: new Style({
    dom: 'backgroundImage',
    $type: 'url',
    render (val, properties, children) {
      if (val) {
        properties.style.backgroundImage = 'url(' + val + ')'
      }
    }
  })
}
