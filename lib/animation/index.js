var Observable = require('vjs/lib/observable')
var Operator = require('vjs/lib/operator')
var frame = require('./frame')

//Needed when using operators
exports.$inject = require('vjs/lib/operator/shared')

exports.$flags = {
  //Operator that will transform the value of the animation val
  _$a: new Operator({
    $key:'_$a',
    $operator:function( val, operator, origin ){
    	var opVal = operator._$val
    	//temp solution remove operator not working
      return opVal === false ? val : opVal
    }
  }),

  //when setting $animation on prop
	$animation: function( val ){
		var current = 0
		var end
		var stamp

    function animate(event, meta, property) {
      if (current !== end) {
        var inc
        if (current > end) {
          inc = -1
        } else {
          inc = 1
        }
        current += inc
        property.setKey('_$a', current, event)
      } else {
        frame.off('$change', property.$path.join(''))
        property.setKey('_$a', false, event)
      }
    }

    this.on('$change', function(event) {
      // what is being set on $val
      if (event.$val) {
        this.setKey('_$a', false, event)

        // unique id for this property
        var path = this.$path.join('')
        end = this.$val

        // add the listener on shared animationFrame
        frame.on('$change', [animate, this], path)
      }
    })

  }
}