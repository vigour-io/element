'use strict'
var Property = require('./')
exports.properties = {
  text: new Property({
    $type: 'string',
    render (val, properties, children) {
      console.log('hello!', this.path, children)
      if (val) {
        children.push(val)
      }
    }
  })
}
