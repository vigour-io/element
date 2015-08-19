var Observable = require('vjs/lib/observable')
var on = Observable.prototype.on
var off = Observable.prototype.off

module.exports = exports = new Observable({
  $count:0,
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
      var cancel
      var $count = this.$count.$val
      if($count === 0){
        this.$play()
      }
      if(base.$listensOnBase){
        base.$listensOnBase.each(function(){
          cancel = true
        })
      }
      if(!cancel){
        this.$count.$val = $count + 1
      }
      return on.apply(this, arguments)
    },
    off:function(  type, base  ){
      if(base){
        var $count = this.$count.$val
        if($count === 1){
          this.$pause()
        }
        this.$count.$val = $count - 1
      }
      return off.apply(this, arguments)
    },
    $play: function(){
      this.$emit('$change')
    },
    $pause: function(){
      window.cancelAnimationFrame(this.$rafId)
    }
  }
})