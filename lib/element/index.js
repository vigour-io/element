/**
 * Element class is used to represent the object that you want to add into the DOM tree.
 * @namespace Element
 *
 * @example
 *var elem = new Element({
 *  text:{
 *    val:"simple div"
 *  }
 *})
 * It will be rendered in dom as a simple div element with "simple div" text
 */
'use strict'

var Observable = require('vjs/lib/observable')
var elementPrototype

var Element = module.exports = new Observable({
  inject: [
    require('../events'),
    require('./key'),
    require('./remove'),
    require('./constructor'),
    require('./node')
  ],
  useVal: true,
  ChildConstructor: 'Constructor',
  on: {
    parent: {
      element: function (data, event) {
        if ((this instanceof Element) || this === elementPrototype) {
          this.parent.node.appendChild(this.node)
        }
      }
    }
  }
}).Constructor

elementPrototype = Element.prototype
