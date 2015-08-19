var Observable = require('vjs/lib/observable')

module.exports = exports = new Observable({
  $duration:0,
  $on: {
    $change: function(event){
    	var _this = this
      // var dateNow = Date.now()
      window.requestAnimationFrame(function(){
        // _this.$duration.$val = Date.now() - dateNow
      	_this.$emit('$change')
      })
    }
  }
})

exports.$emit('$change')

//add removal off listeners
//
//