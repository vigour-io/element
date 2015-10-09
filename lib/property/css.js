'use strict'

// var _ = require('vjs/node_modules/lodash')
var Property = require('./')

// @todo this needs some love!
var React = require('react')

exports.properties = {
  /**
   * Use css to set a css class for the element
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   css: "confirmButton"
   * })
   */


  css: new Property({
    on: {
      data: function (data, event) {
        var element = this.parent
        if (element) {
          var val = this.val
          var node = element.node
          var key = element.key || 0
          if (val) {
            // do dom update
            // React.render(node)
            // node.props.className = val
            // node.setAttribute('data-key', key)
          } else {
            // node.props.className = key
            // node.removeAttribute('data-key')
          }
        }
      }
    }
  })
}
