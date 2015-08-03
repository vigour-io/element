"use strict";

var shared = require( 'vjs/lib/operator/shared' )
var Observable = require('vjs/lib/observable')
var Operator = require( 'vjs/lib/operator' )
var cases = require('./')
var prototypes = cases.prototypes
var Case = cases.Case

module.exports = function( base ){

  prototypes.push( base )
  
  console.error('>>>',cases.$phone)

  base.inject({
    $inject:shared,
    $flags:{
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
  })
}