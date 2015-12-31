'use strict'
var Prop = require('../../property')
var flatParse = require('vigour-js/lib/base').prototype.parseValue

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
  var hashpath = observable.getHashedPath()
  var nodes = global.engine.nodes
  var node
  var key = observable.key
  // if (observable._context) {
  //   var cache = observable.contextMap(global.engine.contextNodes)
  //   let myself = cache[observable.uid]
  //   if (myself) {
  //     node = myself.node
  //   } else {
  //     cache[observable.uid] = {}
  //   }
  //   if (!node) {
  //     node = cache[observable.uid].node = createNode(observable)
  //   }
  // } else {
  node = nodes[hashpath] || (nodes[hashpath] = createNode(observable))
  // }
  if (key) {
    node.className = key
  }
  observable.each(function (property, key) {
    render(observable[key], node, Element, event)
  }, function (property, key) {
    if (property instanceof Prop) {
      // property diff check if rendering from the start prob
      property.render(node, event)
      property.clearContext()
    } else {
      return property instanceof Element
    }
  })
  node.hash = hashpath
  parentNode.appendChild(node)
  observable.clearContext()
}
