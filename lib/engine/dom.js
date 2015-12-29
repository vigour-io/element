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
  // set context here yourseld
  var node = createNode(observable)
  // node.className = observable.key
  if (observable._context) {
    let uid = observable._context.uid
    if (observable._context._context) {
      uid = observable._context._context.uid
    }
    let cnode = contextsNodes[uid]
    if (!cnode) {
      cnode = contextsNodes[uid] = {}
    }
    // ook niet genog moet alle info hebben
    cnode[observable.uid] = node
  } else {
    nodes[observable.uid] = node
  }
  observable.each(function (property, key) {
    walker(observable[key], node)
    // property._context = null
  }, function (property, key) {
    if (property instanceof Prop) {
      property.render(node)
      property._context = null
    } else {
      return property instanceof Element
    }
  })
  parentNode.appendChild(node)
  observable._context = null
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
  // do Constructor later
  // maybe just use refs for elements?
}).Constructor
