var SubsEmitter = require( 'vjs/lib/observable/subscribe/constructor' )

exports.$on = {
  $flags: {
    $render:new SubsEmitter({
      $pattern:{
        $upward:'rendered'
      }
    })
  }
}