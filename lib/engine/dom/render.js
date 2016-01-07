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
  var fromPrerender
  if (!element._context) {
    element.engine = engine
  }
  node = nodes[hashpath]
  if (!node) {
    add = true
    node = (nodes[hashpath] = createNode(element))
  } else if (node.getAttribute('data-hash')) {
    // node.setAttribute('data-hash', false)
    fromPrerender = true
  }
  // console.log(element.css)
  if (key && !fromPrerender && !node.className && !element.css) {
    // console.error(key, element)
    node.className = key
  }

  // is this not better?
  // for (let i in element) {
  //   if (i[0] !== '_') {
  //     let property = element[i]
  //     if (property instanceof Prop) {
  //       // property.key === 'css' wtf css!
  //       if (!fromPrerender || property.key === 'scroll') {
  //         property.render(node, event, element)
  //         property.clearContext()
  //       }
  //     } else if (property instanceof Element) {
  //       render(element[i], node, Element, event, engine)
  //     }
  //   }
  // }

  element.each(function (property, key) {
    render(element[key], node, Element, event, engine)
  }, function (property, key) {
    if (property instanceof Prop) {
      // property.key === 'css' wtf css!
      if (!fromPrerender || property.key === 'scroll') {
        property.render(node, event, element)
        property.clearContext()
      }

    } else if (property instanceof Element) {
      return true
    } else if (property.clearContext) {
      property.clearContext()
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
    parentNode.appendChild(node)
  }

  // console.log('clearContext',element.path)
  element.clearContext()
  // debug.context(app).log('- ')
}
// todo perf -- make mroe of a map instead of flat for removal
