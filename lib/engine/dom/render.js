'use strict'
var Prop = require('../../property')

function createNode (observable, node, event, no) {
  var type = observable.type
  // template node = observable.__node__
  if (type) {
    if (type === 'text') {
      let str = observable.parseValue()
      if (typeof str !== 'string') {
        str = ''
      }
      return document.createTextNode(str)
    }
  } else {
    type = 'div'
  }
  return node ? node.cloneNode(true) : (document.createElement(type && typeof type === 'string' ? type : 'div'))
}

module.exports = function render (element, parentNode, Element, event, engine) {
  var hashpath = element.getHashedPath()
  var nodes = engine.nodes
  var key = element.key // pass key (faster)
  var add
  var node
  if (!element._context) {
    element.engine = engine
  }
  node = nodes[hashpath]
  if (!node) {
    add = true
    node = (nodes[hashpath] = createNode(element))
  }
  if (key) {
    node.className = key
  }
  element.each(function (property, key) {
    render(element[key], node, Element, event, engine)
  }, function (property, key) {
    if (property instanceof Prop) {
      property.render(node, event)
      property.clearContext()
    } else {
      return property instanceof Element
    }
  })
  node.setAttribute('hash', hashpath)
  node.setAttribute('path', element.path.join('/'))
  if (element._on && element._on._dom) {
    // *** TODO **** adding events when ALLREADY rendered
    // *** PERF **** resuse path can be way way faster (were rendering so easy -- curr path + key)
    node._onPath = element.path
    node._engine = engine
    node.setAttribute('EVENT', element.path.join('/'))

    // this can be A LOT better
  }

  if (add) {
    parentNode.appendChild(node)
  }
  element.clearContext()
}
// todo perf -- make mroe of a map instead of flat for removal
