"use strict";

var Property = require('./')
var id = 'draggable'

exports.$flags = {
  $draggable: new Property({
    $on: {
      $change: function( event, removed ) {
        if( !removed ){
          var val = this.$val
          var element = this.$parent

          if(val === true || (!val.y && !val.x)){
            this.set({
              x:true,
              y:true
            })
          }else if(typeof val === 'string'){
            this.setKey(val,true)
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
                    var rect = bind.$node.getBoundingClientRect()
                    var ex = e.x
                    var ey = e.y
                    var x = rect.left
                    var y = rect.top
                    var xbind = draggable.x && draggable.x._$val
                    var ybind = draggable.y && draggable.y._$val

                    if( typeof xbind === 'function' ){
                      xbind = xbind.apply( this, arguments )
                    }else if(xbind === true){
                      if(!bind.$x){
                        bind.setKey('$x',{$val:x})
                      }
                      xbind = bind.$x
                    }

                    if( typeof ybind === 'function' ){
                      ybind = ybind.apply( this, arguments )
                    }else if(ybind === true){
                      if(!bind.$y){
                        bind.setKey('$y',{$val:y})
                      }
                      ybind = bind.$y
                    }

                    app.on('$move',function( event, e ){
                      var newx = ~~(x + (e.x - ex))
                      var newy = ~~(y + (e.y - ey))

                      if(xbind){
                        console.log('xxxx',newx)
                        xbind.$val = newx
                      }
                      if(ybind){
                        ybind.$val = newy
                      }
                    },id)

                    app.on('$up',function(){
                      app.off('$move',id)
                      app.off('$up',id)
                    },id)
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