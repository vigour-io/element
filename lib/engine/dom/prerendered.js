'use strict'
exports.properties = {
  prerendered: true
}

exports.define = {
  prerender (node) {
    walk(this.nodes, node)
  }
}

function walk (nodes, node) {
  var hash = node.getAttribute('data-hash')
  if (hash) {
    nodes[hash] = node
  }
  var cNodes = node.childNodes
  if (cNodes) {
    for (let i in cNodes) {
      if (cNodes[i].nodeType === 1) {
        walk(nodes, cNodes[i])
        // add input etc as well
      } else if (cNodes[i].nodeType === 3) {
        node.__ = cNodes[i]
      }
    }
  }
}
