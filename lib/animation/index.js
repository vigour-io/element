var Observable = require('vjs/lib/observable')
var Operator = require('vjs/lib/operator')
var ease = require('./easing')
var frame = require('./frame')

// needed when using operators
exports.$inject = require('vjs/lib/operator/shared')

exports.$flags = {
  $animation: new Operator({
    $key: '$animation',
    $duration: 60,
    $start: 0,
    $easing: 'outCubic',
    $progress:0,
    $operator: function(val, op, origin ) {
      var $dragging = this.$dragging && this.$dragging.$val
      var $key

      if(!op.$current){
        op.setKey('$current', val)

        if(!op.$init){
          op.setKey('$init', val)
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
      var init = start ? op.$init.$val + start : op.$init.$val
      var end = op.$end.$val
      var duration = op.$duration.$val
      var easing = op.$easing.$val
      var progress = op.$progress.$val++
      var current = op.$current.$val

      if( end !== val ){ //on animation start
        end = op.$end.$val = val
        init = op.$init.$val = current
        progress = op.$progress.$val = 1

        //add listener
        frame.on( '$change', this )
      }

      if(progress > duration){
        return val
      }

      if(progress === duration){
        //remove listener
        frame.off( this )
        //cache emits
        this.$parent.$emit('$transitionEnd')
      }

      return op.$current.$val = ease[easing](
        progress,
        init,
        end - init,
        duration
      )
    }
  })
}