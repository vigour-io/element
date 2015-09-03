"use strict";

var Property = require('../')

exports.$flags = {
  /**
   * This is an observable property which defines elements
   * scroll position from top
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $opacity: 0.5
   * })
   *
   */

  $scrollTop: new Property({
    $on: {
      $new: function () {
        this.setKey('$scrollTop', this.$parent.$node.scrollTop)
      },
      $change: function( event, removed ) {
        var $element = this.$parent
        var $node = $element.$node
        var $val = this.$val

        $node.scrollTop = $val

        $element.$on.$scroll = function (ev, event) {
          this.$val = event.scrollTop
          console.log(event)
        }
      }
    }
  })
}