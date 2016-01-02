'use strict'
var Prop = require('../../property')
var flatParse = require('vigour-js/lib/base').prototype.parseValue

function createNode (observable, node, event, no) {
  var type = observable.type
  // node = observable.__node__
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
  // clean up!
  return node ? node.cloneNode(true) : (document.createElement(type && typeof type === 'string' ? type : 'div'))
}

module.exports = function render (observable, parentNode, Element, event, no) {
  var hashpath = observable.getHashedPath()
  var nodes = global.engine.nodes
  var node
  var key = observable.key
  node = nodes[hashpath] || (nodes[hashpath] = createNode(observable))
  if (key) {
    node.className = key
  }
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
  if (observable._on && observable._on._dom) { // && ._dom
    // *** TODO **** adding events LATER
    node._onPath = observable.path
  }
  parentNode.appendChild(node)
  observable.clearContext()
}
