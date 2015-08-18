var Observable = require('vjs/lib/observable')
var Operator = require('vjs/lib/operator')
var frame = require('./frame')

//Needed when using operators
exports.$inject = require('vjs/lib/operator/shared')

exports.$flags = {
  $animation:new Operator({
    $count:60,
    $start:0,
    $current:0,
    $end:0,
    $key:'$animation',
    $operator:function( val, operator, origin ){
      var start = operator.$start.$val
      var current = operator.$current.$val
      var end = operator.$end.$val

      //here is your animation logic
      if( current !== end && end !== val ){
        end = operator.$end.$val = val
        frame.on( this )
      }

      if( current === val ){
        frame.off( this )
      }

      return val
    }
  })
}