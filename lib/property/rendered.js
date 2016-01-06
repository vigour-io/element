'use strict'
var Property = require('./')

exports.properties = {
  rendered: new Property({
    render (node, event, element) {
      console.log('render?', node._rendered)
      if (!node._rendered) {
        console.error('render')
        element.emit('render')
        element.setKey('rendered', true, event)
        node._rendered = true
      }
    }
  })
}
