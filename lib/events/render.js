var SubsEmitter = require( 'vjs/lib/observable/subscribe/emitter' )
var Base = require('vjs/lib/base')

module.exports = new SubsEmitter({
  $key:'$render',
  $define: {
    // $instances: false,
    $generateConstructor: function() {
      return function DerivedEmitter( val, ev, parent, key ) {
        Base.call( this, false, false, parent, key)
        // console.warn('!!!!!!',this,ret)
        this.setKey( '$pattern',{
          // $parent:{
            rendered:true
          // }
        })

        return this
      }
    }
  }
})