'use strict'
var isNumberLike = require('vigour-js/lib/util/is/numberlike')
var Html5Player = {
  node: 'video',
  define: {
    getTime () {
      return this.node.currentTime / this.duration.val
    },
    getBuffer (time) {
      var buffered = this.node.buffered
      var length = buffered.length
      var duration = this.duration.val
      for (let i = 0; i < length; i++) {
        let start = buffered.start(i) / duration
        let end = buffered.end(i) / duration
        if (time >= start && time <= end) {
          return end
        }
      }
    }
  },
  inject: require('../../../lib/events/render'),
  on: {
    render: {
      handle (data, evt) {
        handleSrc.call(this.src)
      }
    },
    loadeddata: {
      player (data, evt) {
        this.videoWidth.set(this.node.videoWidth, evt)
        setDuration.call(this)
        handleVolume.call(this.volume, data, evt)
        handlePlay.call(this.play, data, evt)
        handleTime.call(this.time, data, evt)
      }
    },
    remove: {
      player () {
        var node = this.node
        node.removeEventListener('loadeddata', onLoadedData)
        node.removeEventListener('play', onPlay)
      }
    }
  },
  videoWidth: {},
  src: { on: { data: { handle: handleSrc } } },
  volume: { on: { data: { handle: handleVolume } } },
  time: {
    on: { data: { handle: handleTime } }
  },
  play: { on: { data: { handle: handlePlay } } },
  ad: {
    define: {
      oldSrc: ''
    },
    play: {
      on: {
        data: {
          handle: function (data, playEvent) {
            var player = this.parent.parent
            var ad = this.parent
            var val = this.val
            var that = this

            if (this.oldSrc) {
              player.play.set(val, playEvent)
            } else if (val) {
              this.oldSrc = player.src.val

              player.set({
                src: ad.src.val,
                play: true,
                on: {
                  ended: {
                    adPlayer: function (data, endEvent) {
                      if (!that.oldSrc) {
                        return
                      }
                      player.set({
                        time: 0,
                        src: that.oldSrc,
                        play: true
                      }, endEvent)
                      that.oldSrc = ''
                      player.off('adPlayer')
                    }
                  }
                }
              }, playEvent)
            }
          }
        }
      }
    }
  }
}

function handleSrc (data) {
  if (!this.parent.rendered) {
    return
  }
  let node = this.parent.node
  let key = this.key
  let val = this.val
  if (val) {
    let nodeSrc = node.getAttribute('src')
    if (nodeSrc) {
      node.setAttribute(key, '')
    }
    node.setAttribute(key, val)
  } else {
    node.removeAttribute(key)
  }
}

function handleVolume (data) {
  if (this.parent && !this.parent.rendered) {
    return
  }
  let node = this.parent.node
  let val = this.val
  if (isNumberLike(val)) {
    node.volume = val
  }
}

function handleTime (data, event) {
  if (
    this.parent && !this.parent.rendered ||
    this.parent.isProgress(event)
  ) {
    return
  }
  let node = this.parent.node
  let val = this.val
  if (val && val === Number(val) && val % 1 !== 0) {
    let duration = this.parent.duration.val
    node.currentTime = (duration * (val * 100)) / 100
  }
}

function handlePlay (data) {
  console.log('HANDLEPLAY => 1');
  if (!this.parent.rendered) {
    return
  }
  let node = this.parent.node
  let val = this.val

  console.log('HANDLEPLAY => 2', val);
  if (val) {
    node.play()
  } else {
    node.pause()
  }
}

function setDuration () {
  let node = this.node
  if (!this.rendered || !node.readyState) {
    return
  }
  let duration = node.duration
  this.duration.val = duration
}

module.exports = function (element) {
  element.set(Html5Player)
  element.node.addEventListener('play', onPlay)
  element.node.addEventListener('loadeddata', onLoadedData)
}

function onPlay (e) {
  e.target.base.emit('play')
}

function onLoadedData (e) {
  e.target.base.emit('loadeddata')
}
