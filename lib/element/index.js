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
        let cnode = contextsNodes[this._context.uid] // switch context and other
        // take multi case into account importante! now you can have probles
          // DIRT!
        if (this._context._context) {
          cnode = contextsNodes[this._context._context.uid]
           if (cnode && cnode[this._context.uid]) {
            return cnode[this._context.uid][this.uid]
          }
        } else if (cnode) {
          return cnode[this.uid]
        }
      } else {
        return nodes[this.uid] // this._node
      }
    }
  },
  useVal: true,
  inject: [
    require('../property/dom')
  ],
  ChildConstructor: 'Constructor'
}).Constructor
