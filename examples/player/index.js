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
  duration: {
    $val: 100,
    $on: {
      $change: function () {
        console.log('yes')
        app.controls.play.selector.$attributes.max.set({
          $val: 10
        })
      }
    }
  }
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
        value:0,
        min: 0,
        max:100
      }
    },
    duration: {
      $text: readyPlayer.duration.$val
    },
    $on: {
      click: function() {
        readyPlayer.id.sendNotification('doPlay');
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
    var progress = Math.floor(data)
    controls.play.elapsed.$text.$val = progress
    app.controls.play.selector.$node.value = progress
  })
}

function setInfo() {
  kdp.addJsListener('kdpReady', function() {
    title.$text.$val = readyPlayer.id.evaluate('{mediaProxy.entry.name}')
    title.description.$text.$val = readyPlayer.id.evaluate('{mediaProxy.entry.description}')
    controls.play.duration.$text.$val = readyPlayer.id.evaluate('{mediaProxy.entry.duration}')
    controls.play.selector.$attributes.set({max:20})
    controls.play.selector.$attributes.max.$val = readyPlayer.id.evaluate('{mediaProxy.entry.duration}')
    //app.controls.play.duration.$text.$val = readyPlayer.id.evaluate('{mediaProxy.entry.duration}')
  })
}

kWidget.addReadyCallback(function(playerId) {
  kdp = readyPlayer.id = document.getElementById(playerId)
  setInfo(kdp)
  console.log(kdp)
  setTime(kdp)
})

app.set({
  title: new title.$Constructor(),
  player: new player.$Constructor(),
  controls: new controls.$Constructor()
})

kWidget.embed({
  'targetId': 'player',
  'wid': '_1984621',
  'uiconf_id': '30785531',
  'entry_id': '1_s11mis1k',
})
