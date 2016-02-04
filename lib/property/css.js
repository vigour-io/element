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
    dom: 'className',
    render (val, properties, children, rdata) {
      console.log('????hello', this.parent.key)
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
