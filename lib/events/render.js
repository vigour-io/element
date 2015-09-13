var Emitter = require( 'vjs/lib/emitter' )

module.exports = new Emitter({
  // $define: {
  //   $generateConstructor: function() {
  //     return function DerivedEmitter( val, ev, parent, key ) {
  //     	parent.$parent.set({$on:{$change:function(){}}})
  //     	parent.$parent.subscribe({
  //     		$upward:{
  //     			rendered:true
  //     		}
  //     	},function( event, meta ){
  //     		console.log('PARTY IN THE HOUSE')
  //     		this.emit( key, event, meta )
  //     	})



  //       return Emitter.apply( this, arguments )
  //     }
  //   }
  // }
}).$Constructor