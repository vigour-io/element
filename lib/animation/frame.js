var Observable = require('vjs/lib/observable')

module.exports = exports = new Observable({
  $duration: 0,
  $on: {
    $change: function(event){
    	var _this = this
      this.$rafId = window.requestAnimationFrame(function(){
        _this.$emit('$change')
      })
    }
  },
  $define:{
    $play:function(){
      this.$emit('$change')
    },
    $pause:function(){
      window.cancelAnimationFrame(this.$rafId)
    }
  }
})

exports.$play()