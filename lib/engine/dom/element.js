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
    getNodeDelete (block, blocknode, hashed, event) {
      // ** REFACTOR --------- TEMP --------
      // this is not only dom unfortunately...
      // ------------------------

      var node = this.getNode() // can be a lot faster here
      if (node && !block) {
        delete this.engine.nodes[this.getHashedPath()]
        var pnode = node.parentNode
        var engine = this.engine
        this.each((p) => {
          if (p.getNodeDelete) {
            p.getNodeDelete(block, this.type !== 'group')
          }
        }, function (prop) {
          return prop instanceof engine.ChildConstructor
        })
        if (pnode && !blocknode) {
          pnode.removeChild(node)
        }
      }
      this.clearContext()
    },
    remove (event) {
      // have to mark if its the top dog
      if (this.$ && this._input && this._input.$ && this.storedmap && this.hashedPureMap ) {
        // console.log('REMOVE old --------------->', this.path, this.hashedPureMap, this.$origin.path)
        this.$origin.$(null, event, void 0, this, this.hashedPureMap)
      }

      if (this._input !== null) {
        this.getNodeDelete(void 0, void 0, void 0, event)
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
      var ret = _addNewProperty.apply(this, arguments)
      if (this.engine) { // engine needs to be sort of the same as context
        let val = this[key]
        if (val instanceof Element) {
          let node = this.getNode()
          if (node && !this.engine.nodes[val.getHashedPath()]) {
            render(val, node, Element, event, this.engine)
          }
        }
      } else if (
        val instanceof Element && val.$ &&
        (this.ChildConstructor === Element ||
        !(val instanceof this.ChildConstructor))
      ) {
        // this has to become stricter
        var p = this
        while (p) {
          if (p.storedmap) {
            delete p.storedmap
          }
          p = p.parent
        }
      }
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
