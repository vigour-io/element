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
              for (var i = removed.length - 1; i >= 0; i--) {
                parent.node.removeChild(parent[removed[i]].node)
              }
            }
          }
        }
      },
      define: {
        generateConstructor() {
          // when adding a cache, remove all nodes attached on the element
          return function ElementCache(val, event, parent, key) {
            if (parent instanceof Element) {
              var node
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
      element(data, event) {
        if ((this instanceof Element) || this === elementPrototype) {
          let child = this
          let parent = this.parent
          if (parent instanceof Cache) {
            if (this._input instanceof Element) {
              child = this._input
            }
            parent = parent.parent
          }
          parent.node.appendChild(child.node)
        }
      }
    }
  }
}).Constructor

elementPrototype = Element.prototype
