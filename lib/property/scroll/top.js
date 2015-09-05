"use strict";

var Property = require( '../' )

function roll( scroll, delta ){
  scroll.$rafId = window.requestAnimationFrame(function(){
    delta = delta/1.1
    scroll.set(scroll.$val - delta)
    if(Math.abs(delta) > 1.1){
      roll( scroll, delta )
    }else{
      scroll.setKey( '$dragging', false )
    }
  })
}

exports.$inject = require( '../style' )
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
  $scrollTop: new Property( {
    $on: {
      $new: function() {
        this.$parent.setKey( '$style', {
          overflow: 'scroll'
        })
      },
      //TODO this must be on render
      $addToParent: function() {
        var $element = this.$parent
        var $node = $element.$node
        $element.set( {
          $scrollTop: $node.scrollTop,
          $on: {
            touchstart: {
              scrollTop: function( event, e ) {
                this._prev = e.y
                this.$scrollTop.setKey( '$dragging', true )
                window.cancelAnimationFrame( this.$scrollTop.$rafId )
              }
            },
            touchmove: {
              scrollTop: function( event, e ) {
                var d = ( e.y - this._prev )
                this.$scrollTop.$val -= d
                this._delta = d
                this._prev = e.y
              }
            },
            touchend: {
              scrollTop: function( event, e ) {
                var $scrollTop = this.$scrollTop
                var d = this._delta
                this._delta = 0
                roll( $scrollTop, d )
              }
            },
            wheel: {
              scrollTop: function( event, e ) {
                var $scrollTop = this.$scrollTop
                var $animation = $scrollTop.$animation
                if( $animation ) {
                  if( $animation.$current._$val !== $animation.$end._$val ) {
                    return
                  }
                }
                $scrollTop.set( {
                  $val: $node.scrollTop,
                  $dragging: true
                } )
                $scrollTop.setKey( '$dragging', false )
              }
            }
          }
        } )
      },
      $change: {
        scrollTop: function( event, removed ) {
          var $element = this.$parent
          var $node = $element.$node
          var $val = this.$val
          
          if( $node.scrollTop !== $val ) {
            $node.scrollTop = $val
            if( $node.scrollTop !== ~~$val ) {
              this.set( $node.scrollTop, event )
            }
          }
        }
      }
    }
  })
}
