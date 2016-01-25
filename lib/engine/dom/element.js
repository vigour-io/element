'use strict'
var Observable = require('vigour-js/lib/observable')
var Base = require('vigour-js/lib/base')
var _remove = Base.prototype.remove
var _addNewProperty = Observable.prototype.addNewProperty
var _setKey = Observable.prototype.setKey
var render = require('./render')

module.exports = function (element) {
  var Element = element.Constructor
  exports.define = {
    node: {
      get () {
        return this.getNode()
      }
    },
    getNode () {
      return this.engine && this.engine.nodes[this.getHashedPath()]
    },
    // TESTING
    getNodeDelete (block, blocknode, hashed) {
      var node = this.getNode() // can be a lot faster here
      if (node && !block) {
        delete this.engine.nodes[this.getHashedPath()]
        var pnode = node.parentNode
        var engine = this.engine
        this.each((p) => {
          if (p.getNodeDelete) {
            p.getNodeDelete(block, this.type !== 'group')
          }
          // p.clearContext()
        }, function (prop) {
          return prop instanceof engine.ChildConstructor
        })
        // this.clearContext()
        if (pnode && !blocknode) {
          pnode.removeChild(node)
        }
      }
      // if (this.path.join('.')==='a.shows.headerofX_shows') {
      //   console.log(this.path.join('.'), this._context)
      // }
      this.clearContext()
    },
    remove () {
      if (this._input !== null) {
        // this._input = null
        this.getNodeDelete()
      }
      return _remove.call(this, false)
    },
    contextRemove () {
      return Base.prototype.contextRemove.apply(this, arguments)
    },
    setKey (key, val, event) {
      if (this[key] && val instanceof Element) {
        if (val !== this[key] && this[key].remove) {
          if ((this.hasOwnProperty(key) || this.hasOwnProperty('_' + key))) {
            this[key].remove(event)
          } else {
            this[key] = null
          }
        }
      }
      return _setKey.apply(this, arguments)
    },
    addNewProperty (key, val, property, event) {
      // use the prop for different engines with specific _Element types
      var ret = _addNewProperty.apply(this, arguments)
      if (this.engine) { // engine needs to be sort of the same as context
        let Element = this.engine.ChildConstructor // cleaner super slow getter
        let val = this[key]
        // check for maps
        if (val instanceof Element) {
          let node = this.getNode()
          if (node && !this.engine.nodes[val.getHashedPath()]) {
            render(val, node, Element, event, this.engine)
          }
        }
      }
      // do the checks
      // if (val instanceof Element) {
      // console.log(this, val)
      if (this.$) {
        // console.log('lets clear!', val)
      }
      // }
      return ret
    }
  }

  exports.properties = {
    // *** CLONE NODE ***
    __node__: true // this is for doing stuff more efficiently , move all engine specific shit away!
  }

  element.set(exports)
}

// exports.inject = require('../../event/browser')
