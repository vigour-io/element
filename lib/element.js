'use strict'
const Observable = require('vigour-observable')
const element = new Observable({
  type: 'element',
  components: {
    property: require('./property')
  },
  properties: {
    node: { val: 'div' },
    namespace: true, // later to props this is weird...
    isElement: { val: true }
  },
  Child: 'Constructor'
}, false)

element.components.element = element
element.inject(
  require('./render/dom/element'),
  require('./subscribe'),
  require('./property/class'), // make this optional!
  require('./property/props'),
  require('./property/style'),
  require('./property/text')
)
element.defaultSubscription = 1
module.exports = element.Constructor
