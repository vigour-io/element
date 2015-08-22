"use strict";

var Observable = require( 'vjs/lib/observable' )
var remove = Observable.prototype.remove

exports.$define = {
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

    var instances = this.hasOwnProperty( '_$instances' ) && this._$instances
    var instance
    var parent
    var path
    var property
    var node
    var parentNode
    var currContext

    if( instances ) {
      for( var i = 0, length = instances.length; i < length; i++ ) {
        instance = instances[ i ]

        node = this.$node
        parentNode = node.parentNode
        if( parentNode ) {
          parentNode.removeChild( node )
        }
      }
    } else if( parent = this._$parent ) {
      path = [ this.$key ]

      var origContext = this._$context
      var origLevel = this._$contextLevel

      while( parent ) {
        if( parent.hasOwnProperty( '_$instances' ) ) {
          instances = parent._$instances
          break
        }
        path.push( parent.$key )
        parent = parent._$parent
      }
      if( instances ) {
        for( var i = 0, length = instances.length; i < length; i++ ) {
          instance = instances[ i ]
          for( var j = path.length - 1; j >= 0; j-- ) {
            property = path[ j ]
            instance = instance[ property ]
          }
          //extra check (when you changed something...)
          if( instance && instance === this ) {
            node = this.$node
            parentNode = node.parentNode
            if( parentNode ) {
              parentNode.removeChild( node )
            }
          }
        }
      }

      //TODO: make this more secure!
      //needs to reset to original context
      //we are going to make function for this in context getter
      if( origContext ) {
        this._$contextLevel = origLevel
        this._$context = origContext

      } else {
        this.$resetContextsUp()
      }

      if( this._$contextLevel ) { //this && !myContextLevel fixes the test but bad need to put it back..
        //make a method for this!

        currContext = this._$context
        parent = this._$parent
          //larger then zero since you dont need to set context on the context
        for( var j = this._$contextLevel - 1; j > 0; j-- ) {
          // console.log('%cVERY STRANGE - bind-context-path:', 'padding:1px; background: #333; color: orange')

          if( parent ) {
            parent._$context = currContext
            parent._$contextLevel = j || null
            parent = parent._$parent
          }
        }
      }
    }

    remove.apply( this, arguments )
  }
}
