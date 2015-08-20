var Observable = require('vjs/lib/observable')
var on = Observable.prototype.on
var off = Observable.prototype.off

var cnt = 0
module.exports = exports = new Observable({
  $on: {
    $change: function(event){
      var _this = this
      this.$rafId = window.requestAnimationFrame(function(){
        _this.$emit('$change')
      })
    }
  },
  $define:{
    on:function( type, base ){
      this.$play()
      return on.apply(this, arguments)
    },
    off:function(  type, base  ){
      var ret = off.apply(this, arguments)
      if(this.$on.$change.$base === null) {
        this.$pause()
      }
      return ret
    },
    $play: function(){
      if( !this.$playing ) {
        this.$playing = true
        this.$emit('$change')
      }
    },
    $pause: function(){
      this.$playing = null
      window.cancelAnimationFrame(this.$rafId)
    }
  }
})