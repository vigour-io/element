'use strict'
var Prop = require('../../property')
var flatParse = require('vigour-js/lib/base').prototype.parseValue
var globals = require('./globals')
var contextsNodes = globals.cnodes
var nodes = globals.nodes

function createNode (observable, node, event) {
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

module.exports = function render (observable, parentNode, Element, event) {
  var node = createNode(observable)

  var dirtypath = observable.path.join('.')
  nodes[dirtypath] = node
  // if (observable._context) {
  //   let uid = observable._context.uid
  //   if (observable._context._context) {
  //     uid = observable._context._context.uid
  //   }
  //   let cnode = contextsNodes[uid]
  //   if (!cnode) {
  //     cnode = contextsNodes[uid] = {}
  //   }
  //   cnode[observable.uid] = node
  // } else {
  //   nodes[observable.uid] = node
  // }
  observable.each(function (property, key) {
    render(observable[key], node, Element, event)
  }, function (property, key) {
    if (property instanceof Prop) {
      property.render(node, event)
      property.clearContext()
    } else {
      return property instanceof Element
    }
  })
  // node.base = observable
  node.dirty = dirtypath
  parentNode.appendChild(node)
  observable.clearContext()
}
