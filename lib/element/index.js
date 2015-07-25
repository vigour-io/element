"use strict";

var DomEmitter = require( './emitter' )
var Observable = require( 'vjs/lib/observable' )
var On = require( 'vjs/lib/observable/onConstructor' )

var Element = new Observable( {
  $define: {
    _$key: {
      set: function( val ) {
        if( this._$node ) {
          this._$node.className = val
        }
        this.__$key = val
      },
      get: function() {
        return this.__$key
      }
    },
    $node: {
    	//Returns the node. If no node, creates the node.
      get: function() {
      	var node = this._$contextNode || this._$node

        if( !node ) {
        	node = document.createElement( 'div' )
          node.$base = this
          node.className = this._$key
          //TODO: remove this:testing
          node.style.borderLeft = '10px solid blue'
          node.innerHTML = this.$path.join(' > ')

          this._$node = node
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
          var childNode
          var childNodes
          var originElement

          if( parent && parent._$node ) {
            //dit is ook niet goed
            originElement = Object.getPrototypeOf( this )
            if( parent instanceof originElement._$parent._$Constructor ) {
              elem = parent._$node
              key = originElement._$key
              childNodes = elem.childNodes
              for( var i = 0, l = childNodes.length; i < l; i++ ) {
              	childNode = childNodes[ i ]
                if( childNode.id === key ) {
                  node = childNode
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
    $node: function( node ) {
    	node.$base = this
      this._$node = node
    },
    $on: new On( {
      $define: {
        $ChildConstructor: DomEmitter
      }
    } )
  },
  $useVal: true,
  $on: {
    $addToParent: function( event, meta ) {
    	var parent = this.$parent
      if( parent && this instanceof Element ) {
        parent.$node.appendChild( this.$node )
      }
    }
  }
} ).$Constructor

Element.prototype.define( {
  $ChildConstructor: Element
} )

module.exports = Element