require('./style.less')
var app = require('../../lib/app')
var Element = require('../../lib/element')
var Observable = require('vjs/lib/observable')
var Emitter = require('vjs/lib/emitter')

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text'),
  require('../../lib/property/attributes'),
  require('vjs/lib/methods/lookUp')
)

var readyPlayer = new Observable({
  id: "",
})

var player = new Element({
  $attributes: {
    id: 'player'
  }
})

var title = new Element({
  $text: " ",
  description: {
    $text: " "
  }
})

var controls = new Element({
  play: {
    $text: 'play',
    elapsed: {
      $text: 0
    },
    selector: {
      $node: 'input',
      $attributes: {
        type: 'range',
        value: 0,
        min: 0,
        max: 151,
      }
    },
    duration: {
      $text: 00
    },
    $on: {
      click: function() {
        readyPlayer.id.sendNotification('doPlay');
        setTime(readyPlayer.id)
      }
    }
  },
  pause: {
    $text: 'pause',
    $on: {
      click: function() {
        readyPlayer.id.sendNotification('doPause')
      }
    }
  }
})

function setTime(playerId) {
  playerId.addJsListener("playerUpdatePlayhead", function(data) {
    app.controls.play.elapsed.$text.$val = Math.floor(data)
  })
}

function setTitle(title) {
  kdp.addJsListener('kdpReady', function() {
    app.title.$text.$val = readyPlayer.id.evaluate('{mediaProxy.entry.name}')
    app.controls.play.duration.$text.$val = readyPlayer.id.evaluate('{mediaProxy.entry.duration}')
    app.title.description.$text.$val = readyPlayer.id.evaluate('{mediaProxy.entry.description}')
  });
}

kWidget.addReadyCallback(function(playerId) {
  kdp = readyPlayer.id = document.getElementById(playerId)
  setTitle(kdp)
})



app.set({
  title: new title.$Constructor,
  player: new player.$Constructor,
  controls: new controls.$Constructor
})

kWidget.embed({
  'targetId': 'player',
  'wid': '_1984621',
  'uiconf_id': '30785531',
  'entry_id': '1_s11mis1k',
})
