'use strict'
const Observable = require('vigour-observable')

module.exports = new Observable({
  type: 'element',
  components: {
    property: require('./property').prototype
  },
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
    require('./subscribe'),
    require('./property/text'),
    require('./property/css'),
    require('./property/attr')
  ],
  css: '',
  Child: 'Constructor'
}, false).Constructor
