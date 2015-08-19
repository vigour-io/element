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
      var $dragging = this.$dragging && this.$dragging.$val
      var $key

      if(!op.$current){
        op.setKey('$current', val)
        if(!op.$start){
          op.setKey('$start', val)
        }
        if(!op.$end){
          op.setKey('$end', val)
        }
      }

      if($dragging) {
        op.$end.$val = val
        return op.$current.$val = val
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

      if(progress > duration){
        return val
      }

      if(progress === duration){
        //remove listener
        frame.off( this )
<<<<<<< HEAD
        //cache emits
        this.$parent.$emit('$transitionEnd')
=======
        this.$parent.$emit('$transitionend')
>>>>>>> fe704be769dd7c97fff74846a2f072e9f34e7b71
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