/**
 * Element class is used to represent the object that you want to add into the DOM tree.
 * @namespace Element
 *
 * @example
 *var elem = new Element({
 *  $text:{
 *    $val:"simple div"
 *  }
 *})
 * It will be rendered in dom as a simple div element with "simple div" text
 */
"use strict";

var Observable = require( 'vjs/lib/observable' )
var derivedObservable = Observable.prototype.$generateConstructor()
var remove = Observable.prototype.remove
var Element

var elementPrototype = new Observable( {
  $inject:require( '../events' ),
  $define: {
    $key: {
      set: function( val ) {
        var node = this._$node
        if( node ) {
          this.$setNodeKey(node, val)
        }
        this._$key = val
      },
      get: function() {
        return this._$key
      }
    },
    /**
     * Use remove to remove a child Element from his parent.
     * @function remove
     * @memberOf Element
     *
     * @example
     *
     * var elem = new Element({
     *  otherElement:{
     *    $css:"style"
     *  }
     *})
     * elem.otherElement.remove(); //elem.otherElement === null
     */
    remove: function( event ) {
      var node = this.$node
      var parentNode = node.parentNode
      if( parentNode ) {
        parentNode.removeChild( node )
      }


      //handle instances!!
      var instances = this.hasOwnProperty( '_$instances' ) && this._$instances
      var instance
      var parent
      var path
      var property
      // var _property
      //optimize this ! e.g. remove removes all instances dont add instances for instances
      if( instances ) {
        for( var i = 0, length = instances.length; i < length; i++ ) {
          instance = instances[i]


          var node = this.$node
          var parentNode = node.parentNode
          if( parentNode ) {
            parentNode.removeChild( node )
          }
        }
      }

      //TODO: can have instances AND context!!!!

      else if( parent = this._$parent ){
        path = [this.$key]

        var origContext = this._$context
        var origLevel = this._$contextLevel

        while(parent){
          if( parent.hasOwnProperty('_$instances') ){
            instances = parent._$instances
            break
          }
          path.push( parent.$key )
          parent = parent._$parent
        }
        if(instances) {
          for( var i = 0, length = instances.length; i < length; i++ ) {
            instance = instances[i]
            for ( var j = path.length - 1; j >= 0; j-- ) {
              property = path[j]
              instance = instance[ property ]
            }
            //extra check (when you changed something...)
            if(instance && instance === this){
              var node = this.$node
              var parentNode = node.parentNode
              if( parentNode ) {
                parentNode.removeChild( node )
              }
            }
          }



        }

        //TODO: make this more secure!
        //needs to reset to original context
        //we are going to make function for this in context getter

        if(origContext) {
          this._$contextLevel = origLevel
          this._$context = origContext

        } else {
          this.$resetContextsUp()
        }

          if( this._$contextLevel ) { //this && !myContextLevel fixes the test but bad need to put it back..
          //make a method for this!

          var currContext = this._$context
          var parent = this._$parent
          //larger then zero since you dont need to set context on the context
          for(  var j = this._$contextLevel-1; j>0 ; j-- ) {
            console.log('%cVERY STRANGE - bind-context-path:', 'padding:1px; background: #333; color: orange')

            if(parent) {
               parent._$context = currContext
               parent._$contextLevel = j || null
               parent = parent._$parent
            }
          }
          console.log('%cresolved - bind-context-path:', 'padding:1px; background: #333; color: orange'
           , '\n\n ', this.$path
           , '\n', 'from: ', this.$path
          )
        }

      }

      remove.apply( this, arguments )
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

                key = originElement.$key
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

    /**
     * This returns the node element of the Element.
     * @memberOf Element
     * @type {Element}
     *
     * @example
     *
     *var elem = new Element({
     *  element:{
     *    $css:"style"
     *  }
     *})
     *
     * //This element will be a <div></div> by default.
     *
     * console.log(element.$node) // <div class="style"></div>
    */
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

          if( key = this.$key ) {
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
    /**
     * This internal function checks if there's a property called $css in the element, if not, it will create
     * a data-key attibute on the tag with the node $key. Otherwise it will create a class attribute with this value
     * @memberOf Element
     * @function $setNodeKey
     *
     * @example
     *
     *var elem = new Element({
     *
     *})
     *
     * app.set({
     *  userBox :new elem.$Constructor
     * })
     *
     * //This element will be a <div class="userBox"></div> by default.
     *
    */
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
    /**
     * This is a $node flag, and it allows you to specify the node type that you want to create.
     * The default element will be a <div></div>
     * @memberOf Element
     * @function $node
     *
     * @example
     *
     *var elem = new Element({
     *  $node:'section'
     *})
     *
     * //This element will be a <section></section> by default.
     *
    */
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
    $addToParent:function( event, meta ) {
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
