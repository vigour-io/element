"use strict";
var Property = require('../')
var shared = require('./shared')
var Parameter = shared.Parameter
var parse = shared.parseParameters

exports.$flags = {
  $x: new Parameter({ $property: '$position' }),
  $y: new Parameter({ $property: '$position' }),

  /**
   * Shortcut for `backgroundPosition` DOM Style property
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var element = new element({
   *   $inject: require('element/lib/property/background/'),
   *   $background: {
   *     $inject: [
   *       require('element/lib/property/background/position'),
   *     ],
   *     $x: 50,
   *     $y: 100
   *   }
   * })
   */
  $position: new Property({
    $on: {
      $change: {
        dom: function( event, removed ) {
          var val = !removed && parse.call( this, '$x', '$y' )
          var node = this.lookUp( '$node' )
          node.style.backgroundPosition = val || null
        }
      }
    }
  })
}
