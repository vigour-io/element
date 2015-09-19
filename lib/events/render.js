var SubsEmitter = require( 'vjs/lib/observable/subscribe/constructor' )
var $exec = SubsEmitter.prototype.$exec

console.log('INJECT!!')

exports.$on = {
  $flags: {
    $render:new SubsEmitter({
    	$define:{
    		$exec:function(){
    			var parent = this._$parent._$parent
    			while( parent ){
    				parent.$rendered = true
    				parent = parent._$parent
    			}
    			$exec.apply( this, arguments )
    		}
    	},
      $pattern:{
        $upward:{
        	$rendered:true
        }
      }
    })
  }
}