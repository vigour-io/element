'use strict'
const Observable = require('vigour-observable')
const element = new Observable({
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
    // , // make this optional!
    require('./property/class'), // make this optional!
    require('./property/props'),
    require('./property/style')
  ],
  class: '',
  Child: 'Constructor'
}, false)

element.components.element = module.exports.prototype
element.inject(require('./property/text'))

module.exports = element.Constructor
