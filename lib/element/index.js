'use strict'
var Observable = require('vigour-js/lib/observable')
var flatParse = require('vigour-js/lib/base').prototype.parseValue
var Prop = require('../property')

var globals = require('../globals')
var contextsNodes = globals.cnodes
var nodes = globals.nodes

module.exports = new Observable({
  trackInstances: true,
  define: {
    getNode () {
      // var nodes =
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
  properties: {
    text: new Prop({
      render (node) {
        if (!node.__) {
          node.__ = document.createTextNode(flatParse.call(this))
          node.appendChild(node.__)
        } else {
          node.__.nodeValue = this.parseValue()
        }
      }
    }),
    css: new Prop({
      render (node) {
        node.className = this.parseValue()
      }
    }),
    src: new Prop({
      render (node) {
        node.src = this.parseValue()
      }
    }),
    type: true
  },
  useVal: true,
  ChildConstructor: 'Constructor'
}).Constructor
