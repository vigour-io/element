'use strict'
var Property = require('./')

exports.properties = {
  rendered: new Property({
    render (node, event) {
      if (!this._input) {
        this.parent.emit('render', false, event)
        console.error('ha!')
        this.set(true, event)
      }
    }
  })
}
