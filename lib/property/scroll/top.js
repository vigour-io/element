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
      //TODO this must be on render
      $addToParent: function () {
        var $element = this.$parent
        var $node = $element.$node

        $element.set({
          $scrollTop: $node.scrollTop,
          $on:{
            $scroll:{
              scrollTop:function( event ){
                var $scrollTop = this.$scrollTop
                var $animation = $scrollTop.$animation
                if($animation){
                  if($animation.$current._$val !== $animation.$end._$val){
                    return
                  }
                }
                $scrollTop.setKey('$dragging',true)
                $scrollTop.set($node.scrollTop, event )
                window.cancelAnimationFrame($scrollTop._$timeout)
                $scrollTop._$timeout = window.requestAnimationFrame(function(){
                  $scrollTop.setKey('$dragging',false)
                })
              }
            }
          }
        })

      },
      $change:{
        scrollTop:function( event, removed ) {
          var $element = this.$parent
          var $node = $element.$node
          var $val = this.$val
          if($node.scrollTop !== $val){
            $node.scrollTop = $val
          }
        }
      }
    }
  })
}