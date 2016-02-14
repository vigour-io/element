'use strict'
var Player = require('../../../../../lib/player/')
var videoAPi = require('../api/video')
var playback = videoAPi.getSource

var orRender = Player.src.render
Player.src.define({
  render () {
    var onRenderArgs = arguments
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
        onRenderArgs[0] = source
      } else if (videoUrls.length > 0) {
        onRenderArgs[0] = videoUrls[0]
      }
      this.applyContext(store)
      orRender.apply(this, onRenderArgs)
    })
    playback.on('error', (err) => {
      console.error(err)
      this.emit('error', err)
    })
    playback.set({
      asset: this.val,
      protocol: 'HLS,DASH'
    })
  }
})
