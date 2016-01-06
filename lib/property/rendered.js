'use strict'
var Property = require('./')

exports.properties = {
  rendered: new Property({
    render (node, event) {
      if (!this._input) {
        this.parent.emit('render', false, event)
        this.set(true, event)
      }
    }
  })
}
