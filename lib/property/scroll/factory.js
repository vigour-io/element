"use strict";
var Property = require( '../' )

var isLikeNumber = require( 'vjs/lib/util' ).isLikeNumber
document.body.addEventListener( 'touchstart', function( e ) {
  e.preventDefault()
}, false )

function roll( scroll, delta ) {
  scroll.$rafId = window.requestAnimationFrame( function() {
    delta = delta / 1.1
    scroll.set( scroll.$val - delta )
    if( Math.abs( delta ) > 1.1 ) {
      roll( scroll, delta )
    } else {
      scroll.setKey( '$dragging', false )
    }
  } )
}
module.exports = function( scrollType ) {
  var $scrollType = '$' + scrollType
  var direction
  var otherDirection
  var onrender = {}
  var onchange = {}
  var onnew = {}
  var flag = {}

  if( scrollType === 'scrollTop' ) {
    direction = 'y'
    otherDirection = 'x'
  } else {
    direction = 'x'
    otherDirection = 'y'
  }

  onrender[scrollType] = function( event ) {
    var $element = this.$parent
    var $node = $element.$node
    var $val = this.$val
    if( isLikeNumber( $val ) ) {
      $node[ scrollType ] = $val
    } else {
      $element.setKey( $scrollType, {
        $val: $node[ scrollType ],
        $dragging: true
      }, event )
    }
    $element[ $scrollType ].setKey( '$dragging', false )
  }

  onnew[scrollType] = function() {
    var $element = this.$parent
    var $node = $element.$node
    var touchstart = {}
    var wheel = {}

    wheel[scrollType] = function( event, e ) {
      var $scroll = this[ $scrollType ]
      var $animation = $scroll.$animation
      if( !$animation || $animation.$current._$input === $animation.$end._$input ) {
        $scroll.set( {
          $val:this.$node[ scrollType ],
          $dragging: true
        })
        $scroll.setKey( '$dragging', false )
      }
    }

    touchstart[scrollType] = function( event, e ) {
      var $scroll = this[ $scrollType ]
      var otherDimension = e[ otherDirection ]
      var prev = e[ direction ]
      var delta
      var checked
      
      $scroll.setKey( '$dragging', true )

      window.cancelAnimationFrame( $scroll.$rafId )

      this.on( 'touchmove', function( event, e ) {

        var dimension = e[ direction ]
        delta = ( dimension - prev )
        prev = dimension
        if( !checked ) {
          $scroll.$val -= delta
          if( Math.abs( delta ) > Math.abs( otherDimension - e[ otherDirection ] ) ) {
            checked = true
          } else {
            this[ $scrollType ].setKey( '$dragging', false )
            this.off( 'touchmove', scrollType )
            this.off( 'touchend', scrollType )
            return
          }
        }
        
        //TODO cache this!
        this[ $scrollType ].$val -= delta
      }, scrollType )

      this.on( 'touchend', function( event, e ) {
        if(delta){
          roll( this[ $scrollType ], delta )
        }
        this.off( 'touchmove', scrollType )
        this.off( 'touchend', scrollType )
      }, scrollType )

    }

    $element.set( {
      $style:{
        overflow: 'scroll'
      },
      $on: {
        touchstart:touchstart,
        wheel:wheel
      }
    } )
  }

  onchange[scrollType] = function( event, removed ) {
    var $element = this.$parent
    var $node = $element.$node
    var $val = ~~this.$val

    if( $node[ scrollType ] !== $val ) {
      $node[ scrollType ] = $val
      if( this._$parent.$rendered && $node[ scrollType ] !== $val ) {
        this.set( $node[ scrollType ], event )
      }
    }
  }

  flag[ $scrollType ] = new Property( {
    $key:$scrollType,
    $inject:require( '../../events/render' ),
    $on: {
      $render: onrender,
      $change: onchange,
      $new: onnew
    }
  } )
  return flag
}
