'use strict'
var Observable = require('vigour-js/lib/observable')
var Element = require('../../element')
var render = require('./render')
module.exports = new Observable({
  properties: {
    node (val) {
      if (this.prerendered) {
        this.prerender(val)
      }
      this._node = val
    },
    nodes: true,
    domEngine: { val: true } // for later now we use global.engine
  },
  inject: [
    require('vigour-js/lib/base/uid/hash'),
    require('./prerendered')
  ],
  define: {
    remove () {
      console.warn('engine dom remove - not handeled yet!')
      // HANDLE!
    },
    generateConstructor () {
      return function DomEngine () {
        this.nodes = {}
        return Observable.apply(this, arguments)
      }
    },
    addNewProperty (key, val, property, event, escape) {
      // if allready property
      var ret = Observable.prototype.addNewProperty.apply(this, arguments)
      if (this._node) {
        val = this[key]
        var Element = this.ChildConstructor
        if (val instanceof Element) {
          // if (val.$) {
            // console.error('??cccccc??')

          // }
          render(val, this._node, Element, event, this)
        }
      }
      return ret
    }
    // setKey (key, val, event) {
    //   console.log(val)
    //   var ret = Observable.prototype.setKey.apply(this, arguments)
    //   if (this._node) {
    //     var Element = this._Element
    //     if (val instanceof Element) {
    //       render(val, this._node, Element, event, this)
    //     }
    //   }
    //   return ret
    // }
  },
  ChildConstructor: Element
}).Constructor
