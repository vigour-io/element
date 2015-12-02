var Observable = require('vigour-js/lib/observable')
var on = Observable.prototype.on
var off = Observable.prototype.off

// TODO this does not need to be an observable, just an emitter
module.exports = exports = new Observable({
  on: {
    data: function (data, event) {
      this.rafId = window.requestAnimationFrame(() => {
        this.emit('data', data)
      })
    }
  },
  define: {
    on: function () {
      this.play()
      return on.apply(this, arguments)
    },
    off: function (type, base) {
      var ret = off.apply(this, arguments)
      if (this._on.data.base === null) {
        this.pause()
      }
      return ret
    },
    play: function () {
      if (!this.playing) {
        this.playing = true
        this.emit('data')
      }
    },
    pause: function () {
      this.playing = null
      window.cancelAnimationFrame(this.rafId)
    }
  }
})
