"use strict";

var DomEmitter = require( './emitter' )
var Observable = require( 'vjs/lib/observable' )
var On = require( 'vjs/lib/observable/onConstructor' )

var Element

var element = new Observable( {
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
      get: function() {
        if( this._$contextNode ) {
          return this._$contextNode
        }

        if( !this._$node ) {
          this._$node = document.createElement( 'div' )
          this._$node.$base = this
          this._$node.className = this._$key

          //TODO: remove this:testing
          this._$node.innerHTML = this.$path
        }
        return this._$node
      }
    },
    $generateConstructor: function() {
      return( function DerivedElement( val, event, parent, key ) {
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
                if( childNode.className === key ) {
                  node = childNode
                }
              }
            }
          }
          
          this._$node = node || this._$node.cloneNode( true )
          this._$node.$base = this
        }
        Observable.apply( this, arguments )
      } )
    }
  },
  $flags: {
    $node: function( val ) {
      this._$node = val
      this._$node.$base = this
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
      if( this.$parent && this instanceof Element ) {
        this.$parent.$node.appendChild( this.$node )
      }
    }
  }
} )

Element = element.$Constructor

element.define( {
  $ChildConstructor: Element
} )

module.exports = Element
