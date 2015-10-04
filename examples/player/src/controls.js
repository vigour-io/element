var Observable = require('vjs/lib/observable')
var app = require('../../../lib/app')

var readyPlayer = new Observable({
  id: '',
  duration: {
    val: 100,
  // on: {
  //   change: function () {
  //     app.controls.play.selector.attributes.max.set({
  //       val: 10
  //     })
  //   }
  // }
  }
})

kWidget.addReadyCallback(function (playerId) {
  kdp = readyPlayer.id = document.getElementById(playerId)
  setInfo(kdp)
  setTime(kdp)
  doSeek(kdp)
})

var setTime = function (playerId) {
  playerId.addJsListener('playerUpdatePlayhead', function (data) {
    app.controls.play.elapsed.text.val = Math.floor(data)
    app.controls.play.selector.node.value = Math.floor(data)
  })
}

var setInfo = function (title) {
  kdp.addJsListener('kdpReady', function () {
    app.title.text.val = readyPlayer.id.evaluate('{mediaProxy.entry.name}')
    app.title.description.text.val = readyPlayer.id.evaluate('{mediaProxy.entry.description}')
    app.controls.play.selector.attributes.max.val = readyPlayer.id.evaluate('{mediaProxy.entry.duration}')
    app.controls.play.duration.text.val = readyPlayer.id.evaluate('{mediaProxy.entry.duration}')
  })
}

var doSeek = function (kdp) {
  kdp.kBind('playerSeekEnd', function () {
    setTimeout(function () {
      kdp.sendNotification('doPause')
    }, 2000)
  })
  var seekDone = false
  kdp.kBind('playerUpdatePlayhead', function () {
    if (!seekDone) {
      kdp.sendNotification('doSeek', 30)
    }
    seekDone = true
  })
  kdp.kBind('mediaReady', function () {
    kdp.sendNotification('doPlay')
  })
}

exports.readyPlayer = readyPlayer
exports.setTime = setTime
exports.setInfo = setInfo
exports.doSeek = doSeek
