var Observable = require('vjs/lib/observable')

module.exports = exports = new Observable({
  $duration: 0,
  $on: {
    $change: function(event){
    	var _this = this
      this.$rafId = window.requestAnimationFrame(function(){
        if (_this.$rafId < 1000) {
          _this.$emit('$change')
        }
      })
      // console.log(_this)
    }
  },
  $define:{
    $play:function(){
      this.$emit('$change')
    },
    $pause:function(){
      window.cancelAnimationFrame(this.$rafId)
    }
    // redefine addListener and removeListener
  }
})

exports.$play()

window.frame = exports