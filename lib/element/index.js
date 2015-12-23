'use strict'
var isNode = require('vigour-js/lib/util/is/node')
var Observable = require('vigour-js/lib/observable')
var addNewProperty = Observable.prototype.addNewProperty

var element = new Observable({
  useVal: true,
  inject: isNode ? require('./node') : require('./dom'),
  ChildConstructor: 'Constructor'
})

var Element = module.exports = element.Constructor

element.define({
  addNewProperty (key, val, property, event, escape) {
    addNewProperty.apply(this, arguments)
    let child = this[key]
    if (child instanceof Element) {
      let insertBefore = child.insertBefore
      if (insertBefore) {
        let refNode = this[insertBefore].node
        if (refNode) {
          this.node.insertBefore(child.node, refNode)
          return
        }
        console.warn('can\'t find insertBefore node')
      }
      this.node.appendChild(child.node)
    }
  }
})
