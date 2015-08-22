"use strict";

var Observable = require( 'vjs/lib/observable' )
var derivedObservable = Observable.prototype.$generateConstructor()

exports.$define = {
  $generateConstructor: function() {
    return( function DerivedElement( val, event, parent, key ) {
      if( this._$node ) {
        var checkNode
        var key
        var node
        var childNodes
        var originElement

        if( parent ) {
          checkNode = parent._$node

          if( checkNode ) {
            originElement = Object.getPrototypeOf( this )

            if( parent instanceof originElement._$parent._$Constructor ) {

              key = originElement.$key
              childNodes = checkNode.childNodes

              for( var i = 0, l = childNodes.length; i < l; i++ ) {
                checkNode = childNodes[ i ]
                if( checkNode.nodeType !== 3 ) {
                  if( this.$getNodeKey( checkNode ) === key ) {
                    node = checkNode
                    break
                  }
                }
              }
            }
          }
        }

        if( !node ) {
          // console.log('this node',this._$node)
          node = this._$node.cloneNode( true )
        }

        node.$base = this
        this._$node = node
      }

      return derivedObservable.apply( this, arguments )
    } )
  }
}
