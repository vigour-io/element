"use strict";

var Property = require( '../' )

function roll( scroll, delta ){
  scroll.$rafId = window.requestAnimationFrame(function(){
    delta = delta/1.1
    scroll.set(scroll.$val - delta || 0)
    if(Math.abs(delta) > 1.1){
      roll( scroll, delta )
    }else{
      scroll.setKey( '$dragging', false )
    }
  })
}

document.body.addEventListener('touchstart',function(e){
  e.preventDefault()
},false)

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
   */
  $scrollTop:new Property( {
    $on: {
      $new: function() {
        this.$parent.setKey( '$style', {
          overflow: 'scroll'
        })
      },
      //TODO this must be on render
      $addToParent:function(){
        var $element = this.$parent
        var $node = $element.$node

        $element.set( {
          $scrollTop: $node.scrollTop,
          $on: {
            touchstart: {
              scrollTop: function( event, e ) {
                var $scrollTop = this.$scrollTop
                var x = e.x
                var prev = e.y
                var delta
                var checked

                $scrollTop.setKey( '$dragging', true )

                window.cancelAnimationFrame( $scrollTop.$rafId )

                this.on('touchmove',function( event, e ) {
                  var y = e.y
                  delta = ( y - prev )
                  prev = y

                  if(!checked){
                    if(Math.abs(delta) > Math.abs(x - e.x)){
                      checked = true
                    }else{
                      this.off('touchmove','scrollTop')
                      this.off('touchend','scrollTop')
                      return
                    }
                  }

                  $scrollTop.$val -= delta
                },'scrollTop')

                this.on('touchend',function( event, e ) {
                  roll( $scrollTop, delta )

                  this.off('touchmove','scrollTop')
                  this.off('touchend','scrollTop')
                },'scrollTop')

              }
            },
            wheel: {
              scrollTop: function( event, e ) {
                var $scrollTop = this.$scrollTop
                var $animation = $scrollTop.$animation
                if( !$animation || $animation.$current._$input === $animation.$end._$input){
                  $scrollTop.set( {
                    $val: $node.scrollTop,
                    $dragging: true
                  } )
                  $scrollTop.setKey( '$dragging', false )
                }
              }
            }
          }
        })
      },
      $change: {
        scrollTop: function( event, removed ) {
          var $element = this.$parent
          var $node = $element.$node
          var $val = ~~this.$val
          if( $node.scrollTop !== $val ) {
            $node.scrollTop = $val
            if( $node.scrollTop !== $val ) {
              this.set( $node.scrollTop, event )
            }
          }
        }
      }
    }
  }),
  $scrollLeft:new Property( {
    $on: {
      $new: function() {
        this.$parent.setKey( '$style', {
          overflow: 'scroll'
        })
      },
      //TODO this must be on render
      $addToParent:function(){
        var $element = this.$parent
        var $node = $element.$node

        $element.set( {
          $scrollLeft: $node.scrollLeft,
          $on: {
            touchstart: {
              scrollLeft: function( event, e ) {
                var $scrollLeft = this.$scrollLeft
                var y = e.y
                var prev = e.x
                var delta
                var checked

                $scrollLeft.setKey( '$dragging', true )

                window.cancelAnimationFrame( $scrollLeft.$rafId )

                this.on('touchmove',function( event, e ) {
                  var x = e.x
                  delta = ( x - prev )
                  prev = x

                  if(!checked){
                    if(Math.abs(delta) > Math.abs(y - e.y)){
                      checked = true
                    }else{
                      this.off('touchmove','scrollLeft')
                      this.off('touchend','scrollLeft')
                      return
                    }
                  }

                  $scrollLeft.$val -= delta
                },'scrollLeft')

                this.on('touchend',function( event, e ) {

                  roll( $scrollLeft, delta )
                  this.off('touchmove','scrollLeft')
                  this.off('touchend','scrollLeft')

                },'scrollLeft')

              }
            },
            wheel: {
              scrollLeft: function( event, e ) {
                var $scrollLeft = this.$scrollLeft
                var $animation = $scrollLeft.$animation
                if( !$animation || $animation.$current._$input === $animation.$end._$input){
                  $scrollLeft.set( {
                    $val: $node.scrollLeft,
                    $dragging: true
                  } )
                  $scrollLeft.setKey( '$dragging', false )
                }
              }
            }
          }
        } )
      },
      $change: {
        scrollLeft: function( event, removed ) {
          var $element = this.$parent
          var $node = $element.$node
          var $val = ~~this.$val
          if( $node.scrollLeft !== $val ) {
            $node.scrollLeft = $val
            if( $node.scrollLeft !== $val ) {
              this.set( $node.scrollLeft, event )
            }
          }
        }
      }
    }
  })
}
