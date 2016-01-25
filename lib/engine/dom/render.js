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
  // if (element._input) {
  //   target = element._input
  // }
  var nodes = engine.nodes
  var key = element.key // pass key (faster)
  var add
  var node
  var fromPrerender
  if (!element._context) {
    element.engine = engine
  }
  node = nodes[hashpath]
  if (!node) {
    if (element.type === 'group') {
      node = nodes[hashpath] = parentNode
    } else {
      add = true
      node = (nodes[hashpath] = createNode(element))
    }
  } else if (node.getAttribute('data-hash')) { // tis is heavy
    // node.setAttribute('data-hash', false)
    fromPrerender = true
  }
  if (key && !fromPrerender && !node.className && !element.css) {
    node.className = key
  }

  element.each(function (property, key) {
    render(element[key], node, Element, event, engine)
  }, function (property, key) {
    if (property) {
      if (property instanceof Prop) {
        // console.log('render it!', key)
        // not rly nice here..
        // if here need to handle data change on elements (ref changes differenty will be super annoying of course)
        // what happens when the target changes??? ---> different type of walk? allways as if getNode for props (SLOW!)
        // un render all children and rerun render?
        // what to do what to do
        // yuzi!
        // if (target && property.$) {
        //   // get node
        //   element.$subscribeProperty(property, target)
        // }
        // property.key === 'css' wtf css!
        if (!fromPrerender || property.key === 'scroll') {
          property.render(node, event, element)
          property.clearContext()
        }
      } else if (property instanceof Element) {
        // console.log('render element....', key, property)
        return true
      } else if (property.clearContext) {
        property.clearContext()
      }
    }
  })

  if (element._on && element._on._dom) {
    // *** TODO **** adding events when ALLREADY rendered
    // *** PERF **** resuse path can be way way faster (were rendering so easy -- curr path + key)
    node._onPath = element.path
    node._engine = engine
  // node.setAttribute('EVENT', element.path.join('/'))
  // this can be A LOT better
  }

  if (add) {
    // parentNode.appendChild(node)
    let insertBefore = element.insertBefore
    if (insertBefore) {
      let before = insertBefore === true
        ? parentNode.firstChild
        : element.parent[insertBefore].node
      if (before) {
        parentNode.insertBefore(node, before)
      } else {
        parentNode.appendChild(node)
      }
    } else {
      parentNode.appendChild(node)
    }
  }

  // console.log('clearContext',element.path)
  element.clearContext()
  // debug.context(app).log('- ')
}
// todo perf -- make mroe of a map instead of flat for removal
