'use strict'
var Property = require('./')
var remove = Property.prototype.remove
// so all operators need to a subscribe and a patch update function

exports.properties = {
  css: new Property({
    $type: 'string',
    Child: {
      $type: 'string',
      render (val, properties) {
        if (val) {
          properties.className += ' ' + val
        }
      },
      Child: 'Constructor'
    },
    render (val, properties, children, rdata) {
      var key = (this.parent.key || rdata && rdata.key)
      if (key) {
        val = val ? key + ' ' + val : key
      }
      properties.className = val || ''
    },
    // ---- this needs some refactor and cleanup ---
    properties: {
      add (val, event) {
        var exists = this.each(function () {}, function (property) {
          if (property instanceof Property) {
            if (property.parseValue() === val) {
              return true
            }
          }
        })
        if (!exists) {
          let cnt = 0
          while (this[cnt]) {
            cnt += 1
          }
          this.setKey(cnt, val)
          this.patch()
        }
      },
      remove (node, event) {
        if (remove.apply(this, arguments)) {
          this.patch()
        }
      },
      toggle (val, event) {
        if (!remove.call(this, val, event)) {
          let cnt = 0
          while (this[cnt]) {
            cnt += 1
          }
          this.setKey(cnt, val, event)
        }
        this.patch()
      }
    }
  }).Constructor
}
