require( './style.less')
var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/attributes' ),
  require( 'vjs/lib/methods/lookUp' )
)

var player = new Element({
  loaded: false,
  $attributes: {
    id: 'player'
  },
})

// kWidget.addReadyCallback( function( playerId ){
//   var kdp = document.getElementById( playerId );
// })

var loaded = false

var controls = new Element({
  play: {
    $text: 'play',
    $on: {
      click: kWidget.addReadyCallback( function( playerId ){
        var kdp = document.getElementById( playerId );
        kdp.sendNotification('doPlay');
      })
    }
  },
  pause: {
    $text: 'pause',
    $on: {
      click: function () {
        kWidget.addReadyCallback( function( playerId ){
          var kdp = document.getElementById( playerId );
          kdp.sendNotification('doPause');
        })
      }
    }
  },
  // seeking: {
  //   $text: 'seeking',
  //   $on: {
  //     click: kWidget.addReadyCallback( function( playerId ){
  //       var kdp = document.getElementById( playerId );
  //       kdp.sendNotification('doSeek', 30 );
  //     })
  //   }
  // }
})

app.set({
 player: new player.$Constructor,
 controls: new controls.$Constructor
})


kWidget.addReadyCallback( function( playerId ){
	var kdp = document.getElementById( playerId );
  console.log('haha')
  return player.loaded = true
});

if (player.loaded) {
  console.log('loaded!')
}

kWidget.embed({
  targetId: "player",
	wid: "_1984621",
	uiconf_id: "30785531",
	entry_id: "1_s11mis1k",
	// flashvars: {
  //   externalInterfaceDisabled: false
	// }
})
