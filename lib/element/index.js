"use strict";

var Observable = require( 'vjs/lib/observable' )
var derivedObservable = Observable.prototype.$generateConstructor()
var Element

var elementPrototype = new Observable( {
  $inject:require( '../events' ),
  $define: {
    _$key: {
      set: function( val ) {
        var node = this._$node
        if( node ) {
          this.$setNodeKey(node, val)
        }
        this.__$key = val
      },
      get: function() {
        return this.__$key
      }
    },
    remove: function( event ) {
      var node = this.$node
      var parentNode = node.parentNode
      //QUESTION: Why do I need this !event check? Seems Observable.remove removes upwards?
      if( parentNode && !event ) {
        parentNode.removeChild( node )
        Observable.prototype.remove.apply( this, arguments )
      }
    },
    $generateConstructor: function() {

      return (function DerivedElement( val, event, parent, key ) {
        if( this._$node ) {
          var checkNode
          var key
          var node
          var childNodes
          var originElement

          if( parent ) {
            checkNode = parent._$node
            if( checkNode ){
              originElement = Object.getPrototypeOf( this )
              if( parent instanceof originElement._$parent._$Constructor ) {
                key = originElement._$key
                childNodes = checkNode.childNodes
                for( var i = 0, l = childNodes.length; i < l; i++ ) {
                  checkNode = childNodes[ i ]
                  if(checkNode.nodeType !== 3){
                    if( this.$getNodeKey(checkNode) === key) {
                      node = checkNode
                      break
                    }
                  }
                }
              }
            }
          }

          if(!node){
            node = this._$node.cloneNode( true )
          }

          node.$base = this
          this._$node = node
        }
        return derivedObservable.apply( this, arguments )
      })
    },
    $node: {
      get: function() {
        var node = this._$node
        var context
        var parent
        var nextNode
        var key
        var path
        var length
        var childNodes

        if( !node ) {
          node = document.createElement( 'div' )
          node.$base = this
          if( key = this._$key ) {
            this.$setNodeKey(node, key)
          }

          this._$node = node

        } else if( context = this._$context ) {

          path = this.$path
          length = path.length
          node = context._$node
          childNodes = node.childNodes

          for( var i = length - this._$contextLevel - 1; i < length; i++ ) {
            for( var j = childNodes.length - 1; j >= 0; j-- ) {
              //TODO: test for performance
              node = childNodes[ j ]
              if(node.nodeType !== 3){
                if( this.$getNodeKey(node) === path[ i ] ) {
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
    $setNodeKey:function( node, key ){
      if( this.$css ){
        node.setAttribute('data-key',key)
      }else{
        node.className = key
      }
    },
    $getNodeKey:function( node ){
      if( this.$css ){
        return node.getAttribute('data-key')
      }else{
        return node.className
      }
    }
  },
  $flags: {
    // node can be actual node (eg. document.body), or string (eg 'div', 'button', etc)
    $node: function( node ) {

      var originalNode
      var attributes
      var attribute

      //TODO remove the old node
      if( typeof node === 'string' ) { //maybe move this to the getter
        node = document.createElement( node )
        //if there are attributes, copy these to new node
        if(originalNode = this._$node){
          attributes = originalNode.attributes
          for (var i = attributes.length - 1; i >= 0; i--) {
            attribute = attributes[i]
            node.setAttribute( attribute.nodeName, attribute.value )
          }
        }
      }

      node.$base = this
      this._$node = node
    }
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
