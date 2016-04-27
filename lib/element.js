'use strict'
const Observable = require('vigour-observable')

module.exports = new Observable({
  type: 'element',
  components: {
    property: require('./property')
  },
  properties: {
    node: { val: 'div' },
    // namespace: true, // to props!
    isElement: { val: true }
  },
  inject: [
    require('./map'),
    require('./render/dom/element'),
    require('./subscribe'),
    require('./property/text'), // make this optional!
    require('./property/class'), // make this optional!
    require('./property/props'),
    require('./property/style')
  ],
  class: '',
  Child: 'Constructor'
}, false).Constructor
