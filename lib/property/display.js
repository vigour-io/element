'use strict'
exports.properties = {
  display: {
    type: 'style',
    render (val, properties, children) {
      if (val === true) {
        properties.style.display = 'block'
      } else if (typeof val === 'string' || val === null) {
        properties.style.display = val
      } else {
        properties.style.display = 'none'
      }
    }
  }
}
