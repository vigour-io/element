"use strict";

var Property = require('./')
var id = 'draggable'

exports.$flags = {
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
          var _this = this

          if(typeof val === 'string'){
            this.setKey(val,true)
          }else if(val === true || (val.y === void 0 && val.x === void 0)){
            this.set({
              x:true,
              y:true
            })
          }

          if(!element.$on || !element.$on.$down || !element.$on.$down.draggable){

            var app = document.body.$base
            var draggable = this

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

                    if( typeof xbind === 'function' ){
                      xbind = xbind.apply( this, arguments )
                    }else if(xbind === true){
                      // if(!bind.$x || bind.$x._$context){
                        bind.setKey('$x',{$val:x},event)
                      // }
                      xbind = bind.$x
                    }

                    if( typeof ybind === 'function' ){
                      ybind = ybind.apply( this, arguments )
                    }else if(ybind === true){
                      // if(!bind.$y || bind.$y._$context){
                        bind.setKey('$y',{$val:y},event)
                      // }
                      ybind = bind.$y
                    }

                    if( xbind || ybind ){
                      var ex = e.x
                      var ey = e.y
                      var checkpass = draggable.pass && draggable.pass._$val

                      app.on('$move',function( event, e ){
                        e.preventDefault()

                        var dx = e.x - ex
                        var dy = e.y - ey

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

                      app.on('$down',function( event, e){
                        event.startX = x
                        event.startY = y

                        bind.$emit('$dragstart',event,e)
                      },id)

                      app.on('$up',function( event, e){
                        app.off('$move',id)
                        app.off('$up',id)

                        event.startX = x
                        event.startY = y

                        event.endX = e.x
                        event.endY = e.y

                        bind.$emit('$dragend',event,e)
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