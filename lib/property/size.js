'use strict'
exports.properties = {
  w: {
    type: 'style',
    dom: 'width',
    render (val, properties, children) {
      if (val || val === 0) {
        properties.style.width = typeof val === 'string' ? val : val + 'px'
      }
    }
  },
  h: {
    type: 'style',
    dom: 'height',
    render (val, properties, children) {
      if (val || val === 0) {
        properties.style.height = typeof val === 'string' ? val : val + 'px'
      }
    }
  }
}
