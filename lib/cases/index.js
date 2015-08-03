"use strict";

var Observable = require('vjs/lib/observable')
var Operator = require( 'vjs/lib/operator' )

var Case = new Operator({
  $flags:{
    $case:new Operator({
      $key:'$case',
      $operator:function( val, operator, origin ){
        return operator.$val && val
      }
    })
  }
}).$Constructor

var cases = window.cases = new Observable({
  // $on:{
  //   $change:function(event,meta){
      
  //   }
  // },
  $phone:false,
  $desktop:true,
  $tablet:false
})

exports.$inject = require( 'vjs/lib/operator/shared' )
exports.$flags = {
  $phone: new Case( {
    $case:cases.$phone,
    $key: '$phone',
    $operator: function( val, operator, origin ) {
      return operator.$parseValue( val, origin ) || val
    }
  } ),
  $desktop: new Case( {
    $case:cases.$desktop,
    $key: '$desktop',
    $operator: function( val, operator, origin ) {
      return operator.$parseValue( val, origin ) || val
    }
  } ),
  $tablet: new Case( {
    $case:cases.$tablet,
    $key: '$tablet',
    $operator: function( val, operator, origin ) {
      return operator.$parseValue( val, origin ) || val
    }
  } )
}