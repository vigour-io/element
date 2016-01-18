exports.ad = {
  properties: {
    oldSrc: '',
    oldTime: ''
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
            ad.isSourceReady.is(true, () => {
              player.ready.is(true, () => {
                ad.oldTime = player.time.val
                ad.isSourceReady.set(false)
                player.set({
                  time: 0,
                  src: {
                    val: ad.src.val
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
              })
            })
          }
        }
      }
    }
  },
  src: {
    dash: {
      $type: 'string',
      on: {
        data: {
          handle: handleSource
        }
      }
    },
    hls: {
      $type: 'string',
      on: {
        data: {
          handle: handleSource
        }
      }
    },
    progressive: {
      $type: 'string',
      on: {
        data: {
          handle: handleSource
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
  },
  isSourceReady: {
    inject: require('vigour-js/lib/observable/is'),
    $type: 'boolean'
  }
}

function handleSource (data, event) {
  var parent = this.parent
  var src = hasSource(parent.val)
  if (src) {
    let topParent = parent.parent
    topParent.oldSrc = topParent.parent.src.val
    topParent.isSourceReady.set(true, event)
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
    src: {
      val: newObj
    },
    on: {
      videoReady: {
        ad () {
          this.time.emit('data', null)
          this.off('videoReady', 'ad')
        }
      }
    },
    play: true,
    time: parent.oldTime
  })
  parent.oldSrc = undefined
  parent.oldTime = undefined
  parent.set({
    canSkip: false,
    skip: false,
    play: false
  })
}
