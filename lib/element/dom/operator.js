'use strict'
var Cache = require('vigour-js/lib/operator/cache/constructor')
var Operator = require('vigour-js/lib/operator')
var Base = require('vigour-js/lib/base')
var addNewProperty = Cache.prototype.addNewProperty

var onOperatorRemove = function () {
  var cache = this._cache
  if (cache) {
    cache.each(function (property, key) {
      let node = property.node
      let parentNode = node.parentNode
      if (parentNode) {
        parentNode.removeChild(node)
      }
    })
  }
}

var onOperatorData = function (data, event) {
  this.parseValue()
}

const ID = 'elemOperator'

module.exports = function (element) {
  var Element = element.Constructor
  var properties = element.properties
  var cacheprops = {}
  for (var i in properties) {
    cacheprops[i] = properties[i]
  }

  // TODO needs its own operator!
  Operator.prototype.define({
    generateConstructor () {
      return function (val, event, parent, key) {
        var ret = Operator.apply(this, arguments)
        if (parent instanceof Element) {
          this.on('remove', onOperatorRemove, ID, false, event)
          this.on('data', onOperatorData, ID, false, event)
        }
        return ret
      }
    }
  })

  element.set({
    properties: {
      _cache: new Cache({
        properties: cacheprops,
        on: {
          remove () {
            var parent = this.parent
            var node
            parent.each(function (property, key) {
              if (property instanceof Element) {
                (node || (node = parent.node)).appendChild(property.node)
              }
            })
          },
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
                    try {
                      parentNode.removeChild(child.node)
                    } catch (err) {
                      let node = child.node
                      let parentNode = node.parentNode
                      if (parentNode) {
                        parentNode.removeChild(node)
                      }
                    }
                  }
                }
              }
            }
          }
        },
        define: {
          addNewProperty (key, val, property, event, escape) {
            addNewProperty.apply(this, arguments)
            let child = this[key]
            let ref = child._input
            if (ref instanceof Element) {
              child = child._input
            }
            this.parent.node.appendChild(child.node)
          },
          generateConstructor () {
            return function ElementCache (val, event, parent, key) {
              if (parent instanceof Element) {
                let node
                parent.each((property, key) => {
                  if (property instanceof Element) {
                    (node || (node = parent.node)).removeChild(property.node)
                  }
                })
              }
              return Base.apply(this, arguments)
            }
          }
        }
      })
    }
  })
}
