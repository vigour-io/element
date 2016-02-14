'use strict'
exports.overlay = {
  progress: {
    inject: require('../../lib/event/drag'),
    on: {
      down (e) { seek.call(this, e) },
      drag (e) { seek.call(this, e) }
    },
    seek: {
      bar: {
        h: 60,
        w: {
          $: 'time',
          $transform (val) {
            return val * 100 + '%'
          }
        }
      }
    }
  },
  button2: {
    h: 60,
    w: '25%',
    type: 'button',
    text: 'toggle',
    on: {
      down (e, event) {
        this.parent.parent.toggle()
      }
    }
  },
  button4: {
    h: 60,
    w: '25%',
    type: 'button',
    text: 'set time',
    on: {
      down (e, event) {
        this.parent.parent.origin.time.val = Math.random()
      }
    }
  },
  button5: {
    h: 60,
    w: '25%',
    type: 'button',
    text: 'move to end',
    on: {
      down (e, event) {
        this.parent.parent.origin.time.val = 0.9999999999
      }
    }
  },
  button6: {
    h: 60,
    w: '25%',
    type: 'button',
    text: 'toggle mute',
    on: {
      down (e, event) {
        var vol = this.lookUp('volume')
        vol.origin.val = vol.val ? 0 : 1
      }
    }
  },
  button7: {
    h: 60,
    w: '25%',
    type: 'button',
    text: 'fullscreen',
    on: {
      down (e, event) {
        var fs = this.lookUp('fullscreen')
        fs.origin.val = fs.val ? 0 : 1
      }
    }
  },
  time: {
    text: {
      $: 'time',
      $prepend: 'time: '
    }
  },
  duration: {
    text: {
      $: 'duration',
      $prepend: 'duration: '
    }
  },
  playing: {
    text: {
      val: 'not playing',
      $playerPlaying: 'playing!'
    }
  },
  ready: {
    text: {
      val: 'not ready',
      $playerReady: 'ready!'
    }
  },
  loading: {
    text: {
      val: 'done loading!',
      $playerLoading: 'loading...'
    }
  },
  muted: {
    text: {
      val: 'volume on!',
      $playerMuted: 'muted!'
    }
  },
  ended: {
    text: {
      val: 'not ended',
      $playerEnded: 'ended!'
    }
  }
}

function seek (e) {
  var rect = e.currentTarget.getBoundingClientRect()
  var x = rect.left
  var nr = (e.x - x) / (rect.right - x)
  var val = nr > 1 ? 1 : nr < 0 ? 0 : nr
  this.seek.bar.state.data.time.origin.val = val
}