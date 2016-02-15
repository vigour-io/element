'use strict'
var Player = require('../../../../../lib/player/')
var videoAPi = require('../api/video')
var playback = videoAPi.getSource

Player.src.define({
  render (val) {
    if (val) {
      var store = this.storeContext()
      playback.on('response', (data) => {
        var videoUrls = data.videoUrl
        if (videoUrls.length > 1) {
          let source = {}
          for (let i = videoUrls.length - 1; i >= 0; i--) {
            let url = videoUrls[i]
            let ext = url.substring(url.lastIndexOf('.') + 1)
            if (ext === 'mpd') {
              source.dash = url
            } else {
              source.hls = url
            }
          }
          val = source
        } else if (videoUrls.length > 0) {
          val = videoUrls[0]
        }

        this.applyContext(store)
        var player = this.parent
        if (player.initialised && player.instance) {
          player.ready.origin.set(false)
          player.ready.render(false)
          player.load(val)
        } else {
          player.init(val)
        }
      })

      playback.on('error', (err) => {
        this.emit('error', err)
      })
      playback.set({
        asset: val,
        protocol: 'HLS,DASH'
      }, false)
      playback.asset.emit('data')
    }
  }
})
