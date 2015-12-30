var Observable = require('vigour-js/lib/observable')
var proto = Observable.prototype
var on = proto.on
var off = proto.off

// TODO this does not need to be an observable, just an emitter
module.exports = new Observable({
  on: {
    data (data, event) {
      this.rafId = window.requestAnimationFrame(() => {
        this.emit('data', data)
      })
    }
  },
  define: {
    on () {
      this.play()
      return on.apply(this, arguments)
    },
    off (type, base) {
      var ret = off.apply(this, arguments)
      if (this._on.data.base === null) {
        this.pause()
      }
      return ret
    },
    play () {
      if (!this.playing) {
        this.playing = true
        this.emit('data')
      }
    },
    pause () {
      this.playing = null
      window.cancelAnimationFrame(this.rafId)
    }
  }
})
