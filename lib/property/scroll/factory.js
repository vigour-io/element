"use strict";

var Property = require( '../' )

document.body.addEventListener('touchstart',function(e){
  e.preventDefault()
},false)

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

module.exports = function( scrollType ){
  var $scrollType = '$' + scrollType
  var flag = {}
  flag[ $scrollType ] = new Property( {
    $on: {
      $new: function() {
        this.$parent.setKey( '$style', {
          overflow: 'scroll'
        })
      },
      $addToParent:function(){
        var $element = this.$parent
        var $node = $element.$node

        $element.set( {
          $on: {
            touchstart: {
              scrollTop: function( event, e ) {
                var $scroll = this[$scrollType]
                var x = e.x
                var prev = e.y
                var delta
                var checked

                $scroll.setKey( '$dragging', true )

                window.cancelAnimationFrame( $scroll.$rafId )

                this.on('touchmove',function( event, e ) {
                  var y = e.y
                  delta = ( y - prev )
                  prev = y

                  if(!checked){
                    if(Math.abs(delta) > Math.abs(x - e.x)){
                      checked = true
                    }else{
                      this.off('touchmove',scrollType)
                      this.off('touchend',scrollType)
                      return
                    }
                  }

                  $scroll.$val -= delta
                },scrollType)

                this.on('touchend',function( event, e ) {
                  roll( $scroll, delta )
                  this.off('touchmove',scrollType)
                  this.off('touchend',scrollType)
                },scrollType)

              }
            },
            wheel: {
              scrollTop: function( event, e ) {
                var $scroll = this[$scrollType]
                var $animation = $scroll.$animation
                if( !$animation || $animation.$current._$input === $animation.$end._$input){
                  $scroll.set( {
                    $val: $node[scrollType],
                    $dragging: true
                  } )
                  $scroll.setKey( '$dragging', false )
                }
              }
            }
          }
        })
      },
      $render: {
        scrollTop:function(){
          var $element = this.$parent
          var $node = $element.$node
          $element.setKey($scrollType,$node[scrollType])
        }
      },
      $change: {
        scrollTop: function( event, removed ) {
          var $element = this.$parent
          var $node = $element.$node
          var $val = ~~this.$val
          if( $node[scrollType] !== $val ) {
            $node[scrollType] = $val
            if( $node[scrollType] !== $val ) {
              this.set( $node[scrollType], event )
            }
          }
        }
      }
    }
  })
  return flag
}