require('./style.less')
var Element = require( '../../lib/element' )
var Input = require( '../../lib/input' )
var app = require( '../../lib/app' )

Element.prototype.inject(require('vjs/lib/operator/transform'))

var input = new Input({
	$attributes : {
		maxlength : 10
	},
  $verify:function( val ){
    return val && val.length > 4
  },
  // $defaultError:true,
  $on:{
    $verified:function( event, meta ) {
      // this.$node.style.border = meta.value ? '10px solid green' : '10px solid red'
    }
  }
})

var passwordInput = new Input({
  $attributes:{
    type:"password"
  }
})

var form = new Element({
  $node: 'form',
  name: new input.$Constructor,
  password: new passwordInput.$Constructor,
  submit: {
    $node:'input',
    $attributes:
    {
      type:'submit'
    }
  },
  $on:{
      $submit: function ( event, e ) {
        e.preventDefault()
        var name = this.name.$val
        var password = this.password.$val
        if (this.name.$verified.$val){
          console.log(name, password)
        }
      }
    }
})
app.set({
	 formulario: form
})

