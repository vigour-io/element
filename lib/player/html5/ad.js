exports.ad = {
  properties: {
    oldSrc: '',
    oldTime: '',
    oldDuration: '',
    hasPlayed: ''
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
            ad.oldTime = player.time.val
            ad.oldDuration = player.duration.val
            ad.hasPlayed = false
            ad.src.is((src) => Boolean(src))
              .then(() => {
                player.set({
                  time: 0,
                  src: ad.src.val,
                  on: {
                    ended: {
                      adPlayerEnded (data, endEvent) {
                        skipAd.call(that, player, endEvent)
                        player.off('ended', 'adPlayerEnded')
                      }
                    }
                  }
                })
              })
          }
        }
      }
    }
  },
  src: {
    on: {
      data: {
        ad (data, event) {
          var that = this
          var ad = that.parent
          var player = ad.parent
          ad.oldSrc = player.src.val
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

function skipAd (player) {
  var parent = this.parent
  if (!parent.oldSrc) {
    return
  }
  player.set({
    time: parent.oldTime || 0,
    duration: parent.oldDuration,
    src: parent.oldSrc,
    play: true
  })
  parent.oldSrc = undefined
  parent.oldTime = undefined
  parent.oldDuration = undefined
  parent.hasPlayed = true
  parent.canSkip.val = false
  parent.skip.val = false
  parent.play.val = false
}
