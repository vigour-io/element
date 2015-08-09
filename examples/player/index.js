require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )
var kWidget = require( './lib/kaltura.js' )


Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/attributes' ),
  require( 'vjs/lib/methods/lookUp' )
)

var player = new Element({
  $css: 'player',
  $width: 800,
  $height: 660
})

player.$node.id = 'player'


app.set({
 player :new player.$Constructor,
})

mw.setConfig ('controlBarContainer.plugin', false)
mw.setConfig ('largePlayBtn.plugin', false)
mw.setConfig ('loadingSpinner.plugin', false)

mw.setConfig('controls', false);



kWidget.embed({
  'targetId': 'player',
  'wid': '_1984621',
  'uiconf_id' : '30743062',
  'entry_id' : '1_s11mis1k',
  'flashvars':{ // flashvars allows you to set runtime uiVar configuration overrides.
    'autoPlay': false
  },
  'params':{ // params allows you to set flash embed params such as wmode, allowFullScreen etc
    'wmode': 'transparent'
  }
});
