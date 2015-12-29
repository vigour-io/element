'use strict'
var Observable = require('vigour-js/lib/observable')
var Prop = require('../property')
var Element = require('../element')
var flatParse = require('vigour-js/lib/base').prototype.parseValue

var globals = require('../globals')
var contextsNodes = globals.cnodes
var nodes = globals.nodes

function createNode (observable, node) {
  var type = observable.type
  if (type) {
    if (type === 'text') {
      let str = flatParse.call(observable)
      if (typeof str !== 'string') {
        str = ''
      }
      return document.createTextNode(str)
    }
  } else {
    type = 'div'
  }
  return node ? node.cloneNode(true) : document.createElement(type && typeof type === 'string' ? type : 'div')
}
// needs to become a method for nested elements e.g render or something
function walker (observable, parentNode) {
  // reuse , clone node and find your nodes
  var node = createNode(observable)
  // node.className = observable.key
  if (observable._context) {
    let cnode = contextsNodes[observable.uid]
    if (!cnode) {
      // so we habe a double guy here
      // console.log(observable.path, observable._context._path)
      // needs double as well... ugh
      // tstore[]
      // tstore[observable._context.uid] =
      cnode = contextsNodes[observable.uid] = {}
    }
    cnode[observable._context.uid] = node
  } else {
    nodes[observable.uid] = node
  }
  observable.each(function (property, key) {
    walker(observable[key], node)
  }, function (property, key) {
    if (property instanceof Prop) {
      property.render(node)
    } else {
      return property instanceof Element
    }
  })
  parentNode.appendChild(node)
}

module.exports = new Observable({
  properties: {
    node: function (val) {
      this._node = val
    }
  },
  define: {
    setKey (key, val) {
      var ret = Observable.prototype.setKey.apply(this, arguments)
      if (val instanceof Element) {
        walker(val, this._node || document.body)
      }
      return ret
    }
  }
}).Constructor
