'use strict'
require('html-element')

const parseStatic = require('../../../static')
const props = parseStatic.property
const elems = parseStatic.element

module.exports = function renderElement (target, type, stamp, subs, tree, uid) {
  var div = document.createElement(target.node)
  props(target, type, stamp, subs, tree, div)
  elems(target, type, stamp, subs, tree, div)
  if (!target.isStatic) { tree._[uid] = div }
  return div
}
