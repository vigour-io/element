"use strict";

var DomEmitter = require( './domemitter' )
var Observable = require( 'vjs/lib/observable' )
var On = require( 'vjs/lib/observable/onConstructor' )
var Element
var elementPrototype = new Observable( {
  $define: {
    _$key: {
      set: function( val ) {
        var node = this._$node
        if( node ) {
          // node.className = val
          node.setAttribute('key',val)
        }
        this.__$key = val
      },
      get: function() {
        return this.__$key
      }
    },
    remove: function() {
      var node = this.$node
      var parentNode = node.parentNode
      if( parentNode ) {
        parentNode.removeChild( node )
      }
      Observable.prototype.remove.apply( this, arguments )
    },
    $node: {
      get: function() {
        var node = this._$node
        var context
        var parent
        var parentNode
        var key
        var path
        var length
        var childNodes

        if( !node ) {
          node = document.createElement( 'div' )
          node.$base = this
          if( key = this._$key ) {
            // node.className = key
            node.setAttribute('key',key)
          }

          //TODO: remove this:testing
          node.innerHTML = this.$path.join( ' > ' )

          this._$node = node

        } else if( context = this._$context ) {

          path = this.$path
          length = path.length
          node = context._$node
          childNodes = node.childNodes

          for( var i = length - this._$contextLevel - 1; i < length; i++ ) {
            for( var j = childNodes.length - 1; j >= 0; j-- ) {
              // if( childNodes[ j ].className === path[ i ] ) {
              //TODO: test for performance
              node = childNodes[ j ]
              if(node.nodeType !== 3){
                if( node.getAttribute('key') === path[ i ] ) {
                  parentNode = node
                  childNodes = node.childNodes
                  break
                }
              }
            }
          }
        }

        return node
      }
    },
    $generateConstructor: function() {
      return function DerivedElement( val, event, parent, key ) {
        if( this._$node ) {
          var elem
          var key
          var node
          var childNodes
          var originElement

          if( parent && parent._$node ) {
            originElement = Object.getPrototypeOf( this )
            if( parent instanceof originElement._$parent._$Constructor ) {
              elem = parent._$node
              key = originElement._$key
              childNodes = elem.childNodes
              for( var i = 0, l = childNodes.length; i < l; i++ ) {
                node = childNodes[ i ]
                //TODO: test for performance
                if(node.nodeType !== 3){
                  // if( node.className === key ) {
                  if( node.getAttribute('key') === key ) {
                    break
                  }
                }
              }
            }
          }

          this._$node = node || this._$node.cloneNode( true )
          this._$node.$base = this
        }

        Observable.apply( this, arguments )
      }
    }
  },
  $flags: {
    // node can be actual node (eg. document.body), or string (eg 'div', 'button', etc)
    $node: function( node ) {
      if( typeof node === 'string' ) {
        node = document.createElement( node )
      }
      node.$base = this
      this._$node = node
    },
    $on: new On( {
      $define: {
        $ChildConstructor: DomEmitter
      }
    })
  },
  $useVal: true,
  $on: {
    $addToParent: function( event, meta ) {
      if( ( this instanceof Element ) || this === elementPrototype ) {
        //TODO: maak functie voor generation
        this.$parent.$node.appendChild( this.$node )
      }
    }
  }
} )

Element = elementPrototype.$Constructor

elementPrototype.define( {
  $ChildConstructor: Element
} )

module.exports = Element