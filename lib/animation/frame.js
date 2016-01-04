var Observable = require('vigour-js/lib/observable')
var proto = Observable.prototype
var on = proto.on
var off = proto.off
var playing

var raf = function () {
  if (playing) {
    frame.emit('data')
    frame.rafId = global.requestAnimationFrame(raf)
  }
}
// TODO this does not need to be an observable, just an emitter

var frame = module.exports = new Observable({
  define: {
    on () {
      if (!playing) {
        playing = true
        raf()
      }
      return on.apply(this, arguments)
    },
    off (type, base) {
      var ret = off.apply(this, arguments)
      if (this._on.data.base === null) {
        playing = null
        global.cancelAnimationFrame(frame.rafId)
      }
      return ret
    }
  }
})