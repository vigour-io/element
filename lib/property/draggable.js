"use strict";

var Property = require( './' )
var body = document.body.$base
var id = 'draggable'

body.$inject = [
  require('../events/move'),
  require('../events/up')
]
exports.$inject = [
  require('../events/down'),
  require('./transform')
]


exports.$flags = {
  $dragging: new Property( {
    $val: false
  } ),

  /**
   * Use $draggable this property allow the user to drag objects
   * @type {boolean}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $draggable: true
   * })
   *
   */
  $draggable: new Property( {
    $on: {
      $change: function( event, removed ) {
        if( !removed ) {
          var val = this.$val
          var element = this.$parent
          var draggable = this

          if( typeof val === 'string' ) {
            this.setKey( val, true )
          } else if( val === true || ( val.$y === void 0 && val.$x === void 0 ) ) {
            this.set( {
              $x: true,
              $y: true
            } )
          }

          if( !element.$on || !element.$on.$down || !element.$on.$down.draggable ) {
            element.set( {
              $on: {
                $down: {
                  draggable: [ function draggableDown( event, e ) {
                    var $bind = draggable.$bind ? draggable.$bind._$val.call( this, event, e ) : this
                    var xbind = draggable.$x && draggable.$x._$val
                    var ybind = draggable.$y && draggable.$y._$val
                    var rect = $bind.$node.getBoundingClientRect()
                    var startX = rect.left
                    var startY = rect.top
                    var checkpass
                    var ex
                    var ey

                    console.log('wowo',xbind,ybind,draggable.$x)

                    if( typeof xbind === 'function' ) {
                      xbind = xbind.apply( this, arguments )
                    } else if( xbind === true ) {
                      $bind.setKey( '$x', {
                        $val: startX
                      }, event )
                      xbind = $bind.$x
                    }

                    if( typeof ybind === 'function' ) {
                      ybind = ybind.apply( this, arguments )
                    } else if( ybind === true ) {
                      $bind.setKey( '$y', {
                        $val: startY
                      }, event )
                      ybind = $bind.$y
                    }

                    if( xbind ) {
                      xbind.setKey( '$dragging', true )
                    }
                    if( ybind ) {
                      ybind.setKey( '$dragging', true )
                    }

                    $bind.emit( '$dragstart', event, e )

                    if( xbind || ybind ) {

                      console.log('wehoo')

                      checkpass = draggable.pass && draggable.pass._$val
                      ex = e.x
                      ey = e.y

                      body.on( '$move', function draggableMove( event, e ) {
                        var dx = e.x - ex
                        var dy = e.y - ey

                        console.log('move!')

                        e.preventDefault()

                        if( checkpass ) {
                          event.dx = dx
                          event.dy = dy
                          if( !checkpass.call( $bind, event, e ) ) {
                            body.off( '$move', id )
                            body.off( '$up', id )
                            return
                          }
                          checkpass = false
                        }

                        if( xbind ) {
                          xbind.set( ~~( startX + dx ), event )
                        }
                        if( ybind ) {
                          ybind.set( ~~( startY + dy ), event )
                        }
                      }, id )

                      body.on( '$up', function draggableUp( event, e ) {
                        body.off( '$move', id )
                        body.off( '$up', id )

                        event.startX = startX
                        event.startY = startY

                        event.endX = e.x
                        event.endY = e.y


                        if( xbind ) {
                          xbind.setKey( '$dragging', false )
                        }
                        if( ybind ) {
                          ybind.setKey( '$dragging', false )
                        }

                        $bind.emit( '$dragend', event, e )
                      }, id )
                    }

                  }, this ]
                }
              }
            } )
          }
        }
      }
    }
  } )
}
