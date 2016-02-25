'use strict'
exports.properties = {
  background: {
    type: 'style',
    dom: 'backgroundImage',
    $type: 'url',
    render (val, properties, children) {
      if (val) {
        properties.style.backgroundImage = 'url(' + val + ')'
      }
    }
  }
}
