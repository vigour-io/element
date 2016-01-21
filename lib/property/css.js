'use strict'
var Property = require('./')

exports.properties = {
  css: new Property({
    ChildConstructor: Property,
    render (node, event, element) {
      let key = element.key
      let val = this.parseValue()
      let str = key ? key + ' ' + val : val
      this.each(function () {}, function (property) {
        if (property instanceof Property) {
          let val = property.parseValue()
          if (val) {
            str += ' ' + property.parseValue()
          }
        }
      })
      node.className = str
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
        }
      },
      remove (val, event) {
        var removed
        this.each(function () {}, function (property) {
          if (property instanceof Property) {
            if (property.parseValue() === val) {
              property.remove()
              removed = true
            }
          }
        })
        if (this.parseValue() === val) {
          this.set('', event)
          removed = true
        }
        return removed
      },
      toggle (val, event) {
        if (!this.properties.remove(val, event)) {
          let cnt = 0
          while (this[cnt]) {
            cnt += 1
          }
          this.setKey(cnt, val)
        }
      }
    }
  }).Constructor
}
