"use strict";

var shared = require( 'vjs/lib/operator/shared' )
var Observable = require('vjs/lib/observable')
var Operator = require( 'vjs/lib/operator' )
var prototypes = []

var Case = new Operator({
  $flags:{
    $case:new Operator({
      $key: '$case',
      $operator: function( val, operator, origin ){
        return operator.$val && val
      }
    })
  },
  $ChildConstructor:'$Constructor'
}).$Constructor



module.exports = window.cases = exports = new Observable({
  $on:{
    $change: function( event, meta ){
      var set = event.$val
      var obj = {}
      var proto
      var i

      for(i in set){
        obj[i] = new Case( {
          $case:this[i],
          $key: i,
          $operator: function( val, operator, origin ) {
            return operator.$parseValue( val, origin ) || val
          }
        } )
      }

      for (i = prototypes.length - 1; i >= 0; i--) {
        prototypes[i].inject({
          $inject:shared,
          $flags:obj
        })
      }
    }
  },
  $ChildConstructor:new Observable({
    $inject:require('vjs/lib/operator/transform')
  }).$Constructor
})

exports.injectable = function( base ){
  prototypes.push( base )
  base.inject({
    $inject:shared
  })
  cases.set({
    $phone:false,
    $desktop:true
  })
}