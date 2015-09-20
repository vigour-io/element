var SubsEmitter = require( 'vjs/lib/observable/subscribe/constructor' )
var $exec = SubsEmitter.prototype.$exec
var Base = require('vjs/lib/base')

exports.$on = {
  $flags: {
    $render:new SubsEmitter({
    	$define:{
    		$exec:function(){
    			var parent = this._$parent.$parent
    			while( parent ){
    				parent.$rendered = true
    				parent = parent.$parent
    			}
    			$exec.apply( this, arguments )
    		},
        $generateConstructor: function() {
          return (function derivedBase( val, event, parent, key ) {
            Base.apply( this, arguments )
            this.setKey('$pattern',{
              $upward:{
                $rendered:true
              }
            })
          })
        }
    	}
    })
  }
}