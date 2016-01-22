'use strict'
var Property = require('./')
var remove = function (val, event) {
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
}

exports.properties = {
  css: new Property({
    ChildConstructor: Property,
    render (node, event, element) {
      let key = element.key
      let val = this.parseValue()
      let str = typeof val === 'string' ? val : ''
      if (key) {
        str = key + ' ' + str
      }
      this.each(function () {}, function (property) {
        if (property instanceof Property) {
          let val = property.parseValue()
          if (typeof val === 'string') {
            str += ' ' + val
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
      remove,
      toggle (val, event) {
        if (!remove.call(this, val, event)) {
          let cnt = 0
          while (this[cnt]) {
            cnt += 1
          }
          this.setKey(cnt, val, event)
        }
        let element = this.parent
        let node = element.getNode()
        if (node) {
          this.render(node, event, element)
        }
      }
    }
  }).Constructor
}
