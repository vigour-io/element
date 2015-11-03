'use strict'
var Cache = require('vjs/lib/operator/cache/constructor')
var Operator = require('vjs/lib/operator')
var Base = require('vjs/lib/base')

module.exports = function (element) {
  var Element = element.Constructor

  // needs its own operator!
  Operator.prototype.define({
    generateConstructor () {
      return function (val, event, parent, key) {
        if (parent instanceof Element) {
          parent.on(function () {
            this.val
          })
        }
        return Operator.apply(this, arguments)
      }
    }
  })

  element.set({
    properties: {
      _cache: new Cache({
        on: {
          data (data){
            console.error('DATA',data,this.parent)
          },
          property: {
            element (data) {
              var removed = data.removed
              console.error('REMOVE', data)
              if (removed) {
                let parent = this.parent
                let i = removed.length - 1
                let parentNode = parent.node
                for (; i >= 0; i--) {
                  let child = parent[removed[i]]
                  if (child) {
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
                  if (!node) {
                    node = parent.node
                  }
                  node.removeChild(property.node)
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
