exports.ad = {
  properties: {
    oldSrc: '',
    oldTime: '',
    oldDuration: ''
  },
  play: {
    on: {
      data: {
        ad (data, event) {
          var that = this
          var ad = that.parent
          var player = ad.parent
          var val = that.val
          if (val) {
            player.ready.is(true, () => {
              ad.oldTime = player.time.val
              ad.oldDuration = player.duration.val
              ad.source.is((source) => hasSource(source.val.plain()), () => {
                player.set({
                  time: 0,
                  source: {
                    val: ad.source.val
                  },
                  on: {
                    finished: {
                      adPlayerEnded (data, endEvent) {
                        skipAd.call(that, player, endEvent)
                        player.off('finished', 'adPlayerEnded')
                      }
                    }
                  }
                })
              }, event)
            }, event)
          }
        }
      }
    }
  },
  source: {
    inject: [
      require('vigour-js/lib/methods/plain'),
      require('vigour-js/lib/observable/is')
    ],
    on: {
      data: {
        ad (data, event) {
          var ad = this.parent
          var player = ad.parent
          ad.oldSrc = player.source.val && player.source.val.plain()
        }
      }
    }
  },
  skip: {
    on: {
      data (data, event) {
        var player = this.parent.parent
        if (this.val) {
          skipAd.call(this, player, event)
        }
      }
    }
  }
}

function hasSource (source) {
  return source && ((source.hls && source.dash) || source.progressive)
}

function skipAd (player) {
  var parent = this.parent
  if (!hasSource(parent.oldSrc)) {
    return
  }
  player.set({
    time: parent.oldTime || 0,
    duration: parent.oldDuration,
    source: {
      val: parent.oldSrc
    },
    play: true
  })
  parent.oldSrc = undefined
  parent.oldTime = undefined
  parent.oldDuration = undefined
  parent.canSkip.val = false
  parent.play.val = false
}
