'use strict'
var Event = require('vigour-js/lib/event')
var widget = require('../element/widget')

exports.on = {
  properties: {
    remove (val, event) {
      var element = this.parent
      if (!element.widget) {
        element.inject(widget)
        element.widget.prototype.destroy = function destroy () {
          var ev = new Event('remove')
          var elem = this.state.elem
          elem._on.removeEmitter.execInternal(elem, ev)
          ev.trigger()
        }
      }
      this.setKey('removeEmitter', val, event)
    }
  }
}
