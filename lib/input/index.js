"use strict";

var Element = require('../element')
var Observable = require('vjs/lib/Observable')

Element.prototype.inject(
  require( '../../lib/property/attributes' )
)
var Input = new Element({
	$node: 'input',
	$attributes: {
		type:'text'
	},
  $flags:{
    $verify:function( fn ) {

      this.setKey('$verified',{
        $transform:fn
      })

      this.on('keyup',function(){
        var nodeValue = this.$node.value
        this.$val = nodeValue
        this.$verified.$val = nodeValue
      })

    },
    $verified:new Observable({
      $inject:require('vjs/lib/operator/transform'),
      $val:false,
      $on:{
        $change:function(){
          this.$parent.$emit('$verified', void 0,this.$val )
        }
      }
    })
  }
})

module.exports = Input.$Constructor
