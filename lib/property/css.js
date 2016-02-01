'use strict'
var Property = require('./')
var remove = Property.prototype.remove
/*
render (data, properties, children, rdata) {
      properties.className = (this.parent.key || rdata && rdata.key) + data
    }
*/

// operators also need properties $,and $collection
exports.properties = {
  css: new Property({
    $type: 'string',
    Child: {
      $type: 'string',
      render (val, properties) {
        properties.className += val
      }
    },
    render (val, properties, children, rdata) {
      let key = (this.parent.key || rdata && rdata.key)
      if (key) {
        val = key + ' ' + val
      }
      properties.className = val || ''
    },
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
