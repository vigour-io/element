var Observable = require('vjs/lib/observable')
var Operator = require('vjs/lib/operator')
var ease = require('./easing')
var frame = require('./frame')

//Needed when using operators
exports.$inject = require('vjs/lib/operator/shared')

// t: current time, b: beginning value, c: change In value, d: duration
// courtesy of Robert Penner


exports.$flags = {
  $animation: new Operator({
    $key: '$animation',
    $duration: 60,
    $easing: 'outCubic',
    $progress:0,
    $operator: function(val, op, origin ) {

      if(!op.$current){
        op.setKey('$current', val)
        if(!op.$start){
          op.setKey('$start', val)
        }
        if(!op.$end){
          op.setKey('$end', val)
        }
      }

      var start = op.$start.$val
      var end = op.$end.$val
      var duration = op.$duration.$val
      var easing = op.$easing.$val
      var progress = op.$progress.$val++
      var current = op.$current.$val

      if( end !== val ){
        end = op.$end.$val = val
        start = op.$start.$val = current
        progress = op.$progress.$val = 1

        //add listener
        frame.on( this )
      }

      if(progress === duration){
        //remove listener
        frame.off( this )
        this.$parent.$emit('$transitionend')
      }

      return op.$current.$val = ease[easing](
        progress,
        start,
        end - start,
        duration
      )
    }
  })
}