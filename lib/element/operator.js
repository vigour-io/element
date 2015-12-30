'use strict'
var Cache = require('vigour-js/lib/operator/cache/constructor')
var Operator = require('vigour-js/lib/operator')
var Base = require('vigour-js/lib/base')

var onOperatorData = function (data, event) {
  if (data !== null) {
    this.parseValue(void 0, event)
  } else if (this._input !== null) {
    let cache = this._cache
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
}

const ID = 'elemOperator'

module.exports = function (element) {
  var Element = element.Constructor
  var properties = element.properties
  var cacheprops = {}

  for (let i in properties) {
    cacheprops[i] = properties[i]
  }

  Operator.prototype.define({
    generateConstructor () {
      return function (val, event, parent, key) {
        var ret = Operator.apply(this, arguments)
        if (parent instanceof Element) {
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
            if (parent) {
              parent.each(function (property, key) {
                if (property instanceof Element) {
                  (node || (node = parent.node)).appendChild(property.node)
                }
              })
            }
          },
          property: {
            element (data, event) {
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
                      console.warn('caught something wrong here')
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
            element.addNewProperty.apply(this.parent, arguments)
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
