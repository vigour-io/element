'use strict'
const Observable = require('vigour-observable')

module.exports = new Observable({
  type: 'element',
  properties: {
    node: { val: 'div' },
    namespace: true,
    state: true,
    _node: true,
    isElement: { val: true }
  },
  inject: [
    require('./map'),
    require('./render/dom/element'),
    require('./subscribe')
  ],
  css: '',
  Child: 'Constructor'
}, false).Constructor
