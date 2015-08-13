require('./style.less')
var Element = require( '../../lib/element' )
var Input = require( '../../lib/input' )
var app = require( '../../lib/app' )

Element.prototype.inject(require('vjs/lib/operator/transform'))

var input = new Input({
	$attributes : {
		maxlength : 10
	},
	$on: {
		$keyup: function ( argument ) {
			console.log("uppp")
		},
		blur:function() {
			this.$val = this.$node.value
		},
		$validation: function ( event, meta ) {
			console.log(meta)
		}
	},
	$required:{
		required: true,
		message: "This is a custom message for required fields",
		defaultStyle : true //otherWise you can pass the css or meybe a function ? WIP
	},
})

var passwordInput = new Input({
  $val:"renan",
  $attributes:{
    type:"password"
  }
})

var form = new Element({
  $node: 'form',
  name: new input.$Constructor,
  surname: new input.$Constructor,
  password: new passwordInput.$Constructor,
  submit: {
    $node:'input',
    $attributes:{
      type:'submit'
    }
  },
  $on:{
      $submit: function ( event, e ) {
        e.preventDefault()
        var test = this.$node.children
        for (var i = 0 ; i < test.length; i++ ){
          if(test[i]){

          }
        }
      }
    }
})


app.set({
	 formulario: form
})

