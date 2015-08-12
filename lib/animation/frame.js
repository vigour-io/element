var Observable = require('vjs/lib/observable')

module.exports = new Observable({
  $on:{
    $change:function(){
      _this = this
      window.requestAnimationFrame(function(){
        // console.log(_this.$val)
        _this.$val++
      })
    }
  }
})

module.exports.$val = 1