'use strict'
var Property = require('./')

exports.properties = {
  rendered: new Property({
    render (node, event, element) {
      console.error('render should not fire when removed!', this._input, this.val)
      if (!this._input) {
        element.emit('render', void 0)
        element.setKey('rendered', true, event)
      }
    }
  })
}
