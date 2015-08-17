"use strict";

var Property = require('./')
var ua = require('../ua')
var prefix = ua.prefix

exports.$flags = {
  /**
   * This is shortcut for css `transition` property
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $transition: '.1s linear opacity'
   * })
   *
   */

  $transition: new Property({
    $on: {
      $change: function( event, removed ) {
        var $element = this.$parent
        var $node = $element.$node
        var $val = this.$val

        $node.style[prefix + 'Transition'] = $val
      }
    }
  })
}
