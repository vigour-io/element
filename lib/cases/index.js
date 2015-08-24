"use strict";

var shared = require( 'vjs/lib/operator/shared' )
var Observable = require('vjs/lib/observable')
var Operator = require( 'vjs/lib/operator' )
var ua = require('../ua')
var Element = require('../element')
var prototypes = []
var defaultCases = [
  'phone',
  'tablet',
  'tv',
  'desktop',
  'ios',
  'android',
  'windows',
  'mac',
  'chromecast'
  ]

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

module.exports = exports = new Observable({
  $on:{
    $change: function( event, meta ){

      var i = prototypes.length - 1
      var set = event.$val
      var obj = {}
      var property

      for(property in set){
        obj[property] = new Case( {
          $case:this[property],
          $key: property,
          $operator: function( val, operator, origin ) {
            return operator.$parseValue( val, origin ) || val
          }
        } )
      }

      for (; i >= 0; i--) {
        prototypes[i].inject({
          $flags:obj
        })
      }
    }
  }
})

exports.injectable = function( base ){
  prototypes.push( base )
  base.inject(shared)
  setDefaultCases( base )
}

//TODO clean this up!!
function setDefaultCases( base ){
  var i = defaultCases.length - 1
  var str
  var $str
  var property

  var set = {
    $native: !!window.cordova,
    $touch:( ( 'ontouchstart' in window )
        || window.DocumentTouch
        && document instanceof DocumentTouch
      )
      || navigator.msMaxTouchPoints
      || false
  }

  for (; i >= 0; i--) {
    str = defaultCases[i]
    $str = '$' + str
    set[$str] = (ua.device === str || ua.platform === str) ? true : false
  }

  if(set){
    if(base){
      
      for(property in set){
        set[property] = new Case( {
          $case:exports[property],
          $key: property,
          $operator: function( val, operator, origin ) {
            return operator.$parseValue( val, origin ) || val
          }
        } )
      }

      base.inject({
        $flags:set
      })
    }else{
      exports.set(set, void 0)
    }
  }
}

setDefaultCases()