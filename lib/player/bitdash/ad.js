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
              ad.isSourceReady.is(true, () => {
                ad.oldTime = player.time.val
                ad.oldDuration = player.duration.val
                ad.isSourceReady.set(false, event)
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
    dash: {
      $type: 'string',
      on: { data: { handle: handleSource } }
    },
    hls: {
      $type: 'string',
      on: { data: { handle: handleSource } }
    },
    progressive: {
      $type: 'string',
      on: { data: { handle: handleSource } }
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
  },
  isSourceReady: {
    inject: require('vigour-js/lib/observable/is'),
    $type: 'boolean'
  }
}

function handleSource (data, event) {
  var source = hasSource(this.parent.val)
  if (source) {
    this.parent.parent.oldSrc = this.parent.parent.parent.source.val
    this.parent.parent.isSourceReady.set(true, event)
  }
}

function hasSource (source) {
  return Boolean(source && (
    (source.hls && source.hls.val) ||
    (source.dash && source.dash.val) ||
    (source.progressive && source.progressive.val)
  ))
}

function skipAd (player, event) {
  var parent = this.parent
  if (!parent.oldSrc) {
    return
  }
  var newObj = {}
  var obj = parent.oldSrc
  var props = ['hls', 'dash', 'progressive']
  for (let i = 0; i < props.length; i++) {
    let key = props[i]
    let prop = obj[key]
    let val = (prop && prop.val) ? prop.val : prop
    if (val && typeof val === 'string') {
      newObj[key] = val
    }
  }
  player.set({
    duration: parent.oldDuration,
    source: {
      val: newObj
    },
    play: true
  }, event)
  player.time.set(parent.oldTime, event)
  parent.oldSrc = undefined
  parent.oldTime = undefined
  parent.oldDuration = undefined
  parent.set({
    canSkip: false,
    skip: false,
    play: false
  }, event)
}
