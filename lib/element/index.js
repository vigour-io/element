"use strict";

var DomEmitter = require( './emitter' )
var Observable = require( 'vjs/lib/observable' )
var On = require( 'vjs/lib/observable/onConstructor' )

var Element = new Observable( {
  $define: {
    $remove:function( val ){
      var context = this._$context
      var node
      var parentNode
      if(context){
        node = context.$node

        var i = context.$path.length
        var path = this.$path
        var length = path.length
        var childNodes = node.childNodes

        for (; i < length; i++) {
          for (var j = childNodes.length - 1; j >= 0; j--) {
            if(childNodes[j].id === path[i]){
              parentNode = node
              node = childNodes[j]
              childNodes = node.childNodes
              break
            }
          }
        }
      }else{
        node = this.$node
        parentNode = node.parentNode
      }
      parentNode.removeChild(node)
    },
    _$key: {
      set: function( val ) {
        if( this._$node ) {
          this._$node.id = val
        }
        this.__$key = val
      },
      get: function() {
        return this.__$key
          // || ( this._$node && ( this.__$key = this._$node.id ) )
      }
    },
    $node: {
      //Returns the node. If no node, creates the node.
      get: function() {
        var node = this._$node
        var key

        if( !node ) {
          node = document.createElement( 'div' )
          node.$base = this
          if( key = this._$key ) {
            node.id = key //this will change!
          }

          //TODO: remove this:testing
          // node.style.borderLeft = '10px solid blue'
          node.innerHTML = this.$path.join( ' > ' )

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
      var node
      if( parent && this instanceof Element ) {
        node = this.$node
        node.id = this._$key
        parent.$node.appendChild( node )

      }
    }
  },
  $inject: require( './properties' )
} ).$Constructor

Element.prototype.define( {
  $ChildConstructor: Element
} )

module.exports = Element
