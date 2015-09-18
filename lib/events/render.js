var SubsEmitter = require( 'vjs/lib/observable/subscribe/constructor' )
var Base = require('vjs/lib/base')

module.exports = new SubsEmitter({
  $pattern:{
    $upward:'rendered'
  }
})