require('vigour-scratch/index.less')
require('./style.less')

var Element = require('../../lib/element')
var app = new Element({
  node:document.body
})

var Observable = require('vigour-js/lib/observable')
var Emitter = require('vigour-js/lib/emitter')
Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text'),
  require('../../lib/property/attributes'),
  require('vigour-js/lib/methods/lookUp')
)

var readyPlayer = require('./src/controls.js').readyPlayer
var doSeek = require('./src/controls.js').doSeek
var setInfo = require('./src/controls.js').setInfo
var setTime = require('./src/controls.js').setTime

var player = new Element({
  attributes: {
    id: 'player'
  }
})

var title = new Element({
  text: ' ',
  description: {
    text: ' '
  }
})

var controls = new Element({
  play: {
    button: {
      node: 'button',
      text: 'play',
      attributes: {
        type: 'button',
      }
    },
    on: {
      click: function () {
        readyPlayer.id.sendNotification('doPlay')
      }
    },
    elapsed: {
      text: 0
    },
    selector: {
      node: 'input',
      attributes: {
        type: 'range',
        value: 0,
        step: '1',
        max: ''
      },
      on: {
        input: function () {
          console.log(this.node.value)
          kdp.sendNotification('doSeek', this.node.value)
        },
      // mousedown: function () {
      //   readyPlayer.id.sendNotification('doPause')
      // },
      // mouseup: function (val) {
      //   kdp.sendNotification('doSeek', this.node.value)
      //   readyPlayer.id.sendNotification('doPause')
      // }
      }
    },
    duration: {
      text: readyPlayer.duration.val
    }
  },
  pause: {
    button: {
      node: 'button',
      text: 'pause',
      attributes: {
        type: 'button',
      }
    },
    on: {
      click: function () {
        readyPlayer.id.sendNotification('doPause')
      }
    }
  },
  mediaSwitch: {
    button: {
      node: 'button',
      text: 'switch media',
      attributes: {
        type: 'button',
      }
    },
    on: {
      click: function () {
        kdp.sendNotification('changeMedia', { 'entryId': '0_uv0gpe78'})
      }
    }
  }
})

kWidget.addReadyCallback(function (playerId) {
  kdp = readyPlayer.id = document.getElementById(playerId)
  setInfo(kdp)
  setTime(kdp)
  doSeek(kdp)
})

app.set({
  title: new title.Constructor(),
  player: new player.Constructor(),
  controls: new controls.Constructor()
})
kWidget.embed({
  'targetId': 'player',
  'wid': '_1984621',
  'uiconf_id': '30785531',
  'entry_id': '1_s11mis1k',
})
