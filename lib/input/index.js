/**
 * @namespace Component
 */

"use strict";

var Element = require('../element')
var Observable = require('vjs/lib/Observable')

Element.prototype.inject(
  require( '../../lib/property/attributes' )
)

 /**
   * Use input to create an input html tag
   * @type {object}
   * @memberOf Component
   *
   * @example
   * var input = new Input({
   *   $attributes:{
   *     maxLength : 10
   *   }
   * })
   * This will create a simple input type text (defaut).
   */
var Input = new Element({
	$node: 'input',
  $attributes: {
    type:'text'
  },
  $on:{
    change:function() {
      this.$val = this.$node.value
    }
  },
  $flags:{
    /**
     * Use the verify flag to use your own validation rules
     * @type {object}
     * @param {function} fn - The function that will be used by the transform to perform the validation
     * @memberOf Component.Input
     */
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
    $defaultError:function ( val ) {
      this.setKey('$errorStyle',{
        $transform:val
      })

      this.on('blur',function(){
        var nodeValue = this.$node.value
        this.$val = nodeValue
        this.$errorStyle.$val = nodeValue
      })
    },
    $errorStyle: new Observable({
      $inject:require('vjs/lib/operator/transform'),
      $val:true,
      $on: {
        $change:function () {
          var input = this.$parent
          if( input.$errorStyle && input.$errorStyle.$val && !input.$verified.$val ) {
            input.$node.style.border = "solid 1px red"
          } else {
            input.$node.style.border = "solid 1px #D9D9D9"
          }
        }
      }
    }),
     /**
     * Use the verified property is created when the verify flag is used.
     * It is an instance of a new Observable Object, and emits the $verified event that can be used to apply any behavior
     * when the transform function returns true or false.(valid or not)
     *
     * @type {object}
     * @memberOf Component.Input
     *
     * @example
     * var input = new Input({
     *  $attributes : {
     *     maxlength : 10
     *   },
     *   $verify:function( val ){
     *     return val && val.length > 4
     *   },
     *   $on:{
     *     $verified:function( event, meta ) {
     *       this.$node.style.border = meta.value ? '10px solid green' : '10px solid red'
     *     }
     *   }
     * })
     *
     *  It means that if the input.value.lenght < 4 the border will have a diferent color and border
     *
     */
    $verified:new Observable({
      $inject:require('vjs/lib/operator/transform'),
      $val:false,
      $on:{
        $change:function(){
          var input = this.$parent
          input.$emit('$verified', void 0, { value: this.$val } )
        }
      }
    })
  }
})

module.exports = Input.$Constructor
