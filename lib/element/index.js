'use strict'
var Observable = require('vigour-js/lib/observable')
var globals = require('../globals')
var contextsNodes = globals.cnodes
var nodes = globals.nodes

module.exports = new Observable({
  trackInstances: true,
  define: {
    getNode () {
      if (this._context) {
        let cnode = contextsNodes[this.uid] // switch context and other
        // take multi case into account importante! now you can have probles
        if (cnode) {
          return cnode[this._context.uid]
        }
      } else {
        return nodes[this.uid] // this._node
      }
    }
  },
  useVal: true,
  ChildConstructor: 'Constructor'
}).Constructor
