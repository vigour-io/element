var Observable = require('vjs/lib/observable')
var Operator = require('vjs/lib/operator')
var frame = require('./frame')

//Needed when using operators
exports.$inject = require('vjs/lib/operator/shared')

exports.$flags = {
  // //Operator that will transform the value of the animation val
  _$a:new Operator({
    $key:'_$a',
    $operator:function( val, operator, origin ){
    	var opVal = operator._$val
      return opVal === false ? val : opVal //temp solution remove operator not working
    }
  }),

	$animation:function( val ){
		var current = 0
		var end
		var stamp
		this.on('$change',function(event){
			if( !event.$origin._$animationFrame ){ // what is being set on $val
				this.setKey( '_$a', false, event )
				var path = this.$path.join('') // unique id for this property
				end = this.$val
				var _this = this
				frame.on('$change',function(event, meta ){ // add the new one
					_this.$emit('$change',event)
				},path)
			}

			if(current !== end){
				
				if(current > end){
					current = current - 1 //this determines speed
				}else{
					current = current + 1
				}

				this.setKey( '_$a', current, event )

			}else{
				
				// if( this._$a ){
				// 	this._$a.remove()
				// }
				this.setKey( '_$a', false, event )
				console.log('remove',this.$path.join(''))
				frame.off('$change',this.$path.join(''))
			}

		})
	}

	// $animation:function( val ){
	// 	var current = 0
	// 	var end
	// 	this.on('$change',function(event){
			
	// 		if( event.$val ){ // what is being set on $val
				
	// 			// if( this._$a ){
	// 			// 	this._$a.remove()
	// 			// }
	// 			this.setKey( '_$a', false, event )

	// 			var path = this.$path.join('') // unique id for this property
	// 			end = this.$val
	// 			var _this = this
	// 			frame.on('$change',function(event, meta ){ // add the new one
	// 				_this.$emit('$change')
	// 			},path)

	// 		}

	// 		if(current !== end){
				
	// 			if(current > end){
	// 				current = current - 1 //this determines speed
	// 			}else{
	// 				current = current + 1
	// 			}

	// 			this.setKey( '_$a', current, event )

	// 		}else{
				
	// 			// if( this._$a ){
	// 			// 	this._$a.remove()
	// 			// }

	// 			this.setKey( '_$a', false, event )
	// 			frame.off('$change',this.$path.join(''))	
	// 		}

	// 	})
	// }
}