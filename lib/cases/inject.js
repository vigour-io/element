"use strict";

var shared = require( 'vjs/lib/operator/shared' )
var Observable = require('vjs/lib/observable')
var Operator = require( 'vjs/lib/operator' )
var cases = require('./')
var prototypes = cases.prototypes
var Case = cases.Case

module.exports = function( base ){
  
  prototypes.push( base )

  base.inject({
    $inject:shared
  })

  cases.set({
    $phone:false,
    $desktop:true
  })
}