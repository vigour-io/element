'use strict'
var Cache = require('vigour-js/lib/operator/cache/constructor')
var Operator = require('vigour-js/lib/operator')
var Base = require('vigour-js/lib/base')

module.exports = function (element) {
  var Element = element.Constructor
  // needs its own operator!
  Operator.prototype.define({
    generateConstructor () {
      return function (val, event, parent, key) {
        var ret = Operator.apply(this, arguments)
        // console.time('operator')
        if (parent instanceof Element) {
          this.on('remove', function () {
            this._cache.each((property, key) => {
              let node = property.node
              let parentNode = node.parentNode
              if (parentNode) {
                parentNode.removeChild(node)
              }
            })
          })
          this.on('data', function (data, event) {
            console.time('on data')
            this.val
            console.timeEnd('on data')
          }, 'elementOperator')
        }
        // console.timeEnd('operator')
        return ret
      }
    }
  })

  element.set({
    properties: {
      _cache: new Cache({
        on: {
          property: {
            element (data) {
              var removed = data.removed
              if (removed) {
                let parent = this.parent
                let i = removed.length - 1
                let parentNode = parent.node
                for (; i >= 0; i--) {
                  let child = parent[removed[i]]
                  if (child instanceof Element) {
                    parentNode.removeChild(child.node)
                  }
                }
              }
            }
          }
        },
        define: {
          generateConstructor () {
            // when adding a cache, remove all nodes attached on the element
            return function ElementCache (val, event, parent, key) {
              if (parent instanceof Element) {
                let node
                parent.each((property, key) => {
                  if (property instanceof Element) {
                    if (!node) {
                      node = parent.node
                    }
                    node.removeChild(property.node)
                  }
                })
              }
              return Base.apply(this, arguments)
            }
          }
        }
      }).Constructor
    }
  })
}

