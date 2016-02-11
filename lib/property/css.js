'use strict'
var Property = require('./')
var remove = Property.prototype.remove
// var domTypes =
// so all operators need to a subscribe and a patch update function
exports.properties = {
  css: new Property({
    $type: 'string',
    define: { compare () {} },
    Child: {
      define: { compare () {} },
      $type: 'string',
      render (val, properties) {
        if (val) {
          properties.className += ' ' + val
        }
      },
      Child: 'Constructor'
    },
    // dom: 'className',
    render (val, properties, children, rdata) {
      var key = (this.parent.key || rdata && rdata.key)
      console.error('!', key, val)
      if (key) {
        val = val ? key + ' ' + val : key
      }
      if (this.parent.type && this.parent.type !== this.parent.node) {
        console.error('TYPE')
        val = val ? 'type-' + this.parent.type + ' ' + val : 'type-' + this.parent.type
      }
      if (properties.className) {
        properties.className += ' ' + val
      } else {
        properties.className = val || ''
      }
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
      remove (val, event) {
        if (remove.call(this, event)) {
          this.patch()
        }
      },
      toggle (val, event) {
        if (!remove.call(this, event)) {
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
