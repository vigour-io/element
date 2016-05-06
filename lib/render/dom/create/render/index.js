'use strict'
require('html-element')
const parseStatic = require('../../../static')
const props = parseStatic.property
const elems = parseStatic.element

module.exports = function renderElement (target, type, stamp, subs, tree, uid) {
  var node = document.createElement(target.node)
  props(target, node)
  elems(target, node)
  if (!target.isStatic) { tree._[uid] = node }
  return node
}
