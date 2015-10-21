/**
 * Element class is used to represent the object that you want to add into the DOM tree.
 * @namespace Element
 *
 * @example
 *var elem = new Element({
 *  text:{
 *    val:"simple div"
 *  }
 *})
 * It will be rendered in dom as a simple div element with "simple div" text
 */
'use strict'

var Base = require('vjs/lib/base')
var Observable = require('vjs/lib/observable')
var Cache = require('vjs/lib/operator/cache/constructor')
var Operator = require('vjs/lib/operator')

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

var elementPrototype

var Element = module.exports = new Observable({
  inject: [
    require('../events'),
    require('./key'),
    require('./remove'),
    require('./constructor'),
    require('./node')
  ],
  useVal: true,
  ChildConstructor: 'Constructor',
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
                if (child){
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
          return function ElementCache(val, event, parent, key) {
            if (parent instanceof Element) {
              let node
              parent.each((property) => {
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
  },
  on: {
    parent: {
      element (data, event) {
        if ((this instanceof Element) || this === elementPrototype) {
          let child = this
          let parent = this.parent
          let fireParent
          if (parent instanceof Cache) {
            if (this._input instanceof Element) {
              child = this._input
            }
            parent = parent.parent
            fireParent = true
          }
          parent.node.appendChild(child.node)

          // if (fireParent) {
          //   child.emit('parent', parent, event)
          // }
        }
      }
    }
  }
}).Constructor

elementPrototype = Element.prototype
