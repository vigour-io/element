'use strict'
var Property = require('./')
var render = function (self, event) {
  let element = self.parent
  let node = element.getNode()
  if (node) {
    element._csscache = null
    self.render(node, event, element)
  }
}
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
    ChildConstructor: new Property({
      render (node, event, css) {
        css._parent._csscache = null
      }
    }),
    render (node, event, element) {
      if (element._csscache) {
        node.className = element._csscache
      } else {
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
        element._csscache = str
      }
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
          render(this, event)
        }
      },
      remove (node, event) {
        if (remove.apply(this, arguments)) {
          render(this, event)
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
        render(this, event)
      }
    }
  }).Constructor
}
