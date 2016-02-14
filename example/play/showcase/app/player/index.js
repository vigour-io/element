'use strict'
var Player = require('../../../../../lib/player/')
var videoAPi = require('../api/video')
var playback = videoAPi.getSource

var http = require('http')
var opts = {
  port: 80,
  hostname: 'adm-ums.vigour.io:80',
  method: 'post',
  path: '/login/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

console.error('===================== HEY')
var req = http.request(opts)
req.end(JSON.stringify({
  username: 'zappa2@mailinator.com',
  password: 'zappa2'
}))

var orRender = Player.src.render
Player.src.define({
  render () {
    console.error(' THE SOURCE! ', this.val)
    var onRenderArgs = arguments
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
      orRender.apply(this, arguments)
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
