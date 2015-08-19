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
        value: 110,
        min: 0,
        max:100
        // max: {
        //   $val: 100,
        //   $on: {
        //     $change: function() {
        //       console.log('yes', this.$val)
        //       return this.$val
        //     }
        //   }
        // }
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
    app.controls.play.elapsed.$text.$val = Math.floor(data)
    app.controls.play.selector.$attributes.value.$val = Math.floor(data)
  })
}

function setInfo(title) {
  kdp.addJsListener('kdpReady', function() {
    app.title.$text.$val = readyPlayer.id.evaluate('{mediaProxy.entry.name}')
    app.title.description.$text.$val = readyPlayer.id.evaluate('{mediaProxy.entry.description}')
    app.controls.play.duration.$text.$val = readyPlayer.id.evaluate('{mediaProxy.entry.duration}')
    app.controls.play.selector.$attributes.set({max:20})
    app.controls.play.selector.$attributes.max.$val = readyPlayer.id.evaluate('{mediaProxy.entry.duration}')
    //app.controls.play.duration.$text.$val = readyPlayer.id.evaluate('{mediaProxy.entry.duration}')
  })
}

kWidget.addReadyCallback(function(playerId) {
  kdp = readyPlayer.id = document.getElementById(playerId)
  setInfo(kdp)
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
