var Observable = require('vjs/lib/observable')
var Operator = require('vjs/lib/operator')
var frame = require('./frame')

//Needed when using operators
exports.$inject = require('vjs/lib/operator/shared')

exports.$flags = {
  //Operator that will transform the value of the animation val
  $animation:new Operator({
    $key:'$animation',
    $operator:function( val, operator, origin ){
      return val
    }
  })
}