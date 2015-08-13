var Observable = require('vjs/lib/observable')

module.exports = exports = new Observable({
  $on:{
    $change:function(event){
    	var _this = this
      window.requestAnimationFrame(function(){
      	_this.$val++
      })
    }
  }
})

exports.$val = 0