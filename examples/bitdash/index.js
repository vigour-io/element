require('./style.less')
var app = require('../../lib/app')
var Element = require('../../lib/element')
var Observable = require('vjs/lib/observable')
var Emitter = require('vjs/lib/emitter')

var initBitdash = require('./src/bitdash')

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text'),
  require('../../lib/property/attributes'),
  require('vjs/lib/methods/lookUp')
)

var player = new Element({
  attributes: {
    id: 'player'
  }
})

app.set({
  player: new player.Constructor(),
})

initBitdash()
