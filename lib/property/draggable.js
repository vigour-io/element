"use strict";

var Property = require('./')
var id = 'draggable'

exports.$flags = {
  $dragging: new Property({
    $val: false
  }),

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
  $draggable: new Property({
    $on: {
      $change: function( event, removed ) {
        if( !removed ){
          var val = this.$val
          var element = this.$parent
          var draggable = this
          var app

          if(typeof val === 'string'){
            this.setKey(val,true)
          }else if(val === true || (val.y === void 0 && val.x === void 0)){
            this.set({
              x:true,
              y:true
            })
          }

          if(!element.$on || !element.$on.$down || !element.$on.$down.draggable){

            app = document.body.$base

            element.set({
              $on:{
                $down:{
                  draggable:[ function drag( event, e ) {
                    var bind = draggable.bind
                      ? draggable.bind._$val.call( this, event, e )
                      : this
                    var xbind = draggable.x && draggable.x._$val
                    var ybind = draggable.y && draggable.y._$val
                    var rect = bind.$node.getBoundingClientRect()
                    var x = rect.left
                    var y = rect.top
                    var ex
                    var ey
                    var checkpass

                    if( typeof xbind === 'function' ){
                      xbind = xbind.apply( this, arguments )
                    }else if(xbind === true){
                      bind.setKey('$x',{$val:x},event)
                      xbind = bind.$x
                    }

                    if( typeof ybind === 'function' ){
                      ybind = ybind.apply( this, arguments )
                    }else if(ybind === true){
                      bind.setKey('$y',{$val:y},event)
                      ybind = bind.$y
                    }

                    if(xbind){
                      xbind.setKey('$dragging', true)
                    }
                    if(ybind){
                      ybind.setKey('$dragging', true)
                    }

                    bind.emit('$dragstart', event, e)

                    if( xbind || ybind ){
                      ex = e.x
                      ey = e.y
                      checkpass = draggable.pass && draggable.pass._$val

                      app.on('$move',function( event, e ){
                        var dx = e.x - ex
                        var dy = e.y - ey

                        e.preventDefault()

                        if( checkpass ){
                          event.dx = dx
                          event.dy = dy
                          if(!checkpass.call( bind, event, e)){
                            app.off('$move',id)
                            app.off('$up',id)
                            return
                          }else{
                            checkpass = false
                          }
                        }

                        if(xbind){
                          xbind.set(~~(x + dx),event)
                        }
                        if(ybind){
                          ybind.set(~~(y + dy),event)
                        }
                      },id)

                      app.on('$up',function( event, e){
                        app.off('$move',id)
                        app.off('$up',id)

                        event.startX = x
                        event.startY = y

                        event.endX = e.x
                        event.endY = e.y


                        if(xbind){
                          xbind.setKey('$dragging', false)
                        }
                        if(ybind){
                          ybind.setKey('$dragging', false)
                        }

                        bind.emit('$dragend', event, e)
                      },id)
                    }

                  }, this ]
                }
              }
            })
          }
        }
      }
    }
  })
}
