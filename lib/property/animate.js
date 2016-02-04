'use strict'

// t: current time, b: beginning value, c: change In value, d: duration
var outCubic = (t, b, c, d) => {
  return c * ((t = t / d - 1) * t * t + 1) + b
}

exports.properties = {
  animate (opts) {
    if (opts) {
      let store = {}
      let duration = opts.duration || 36
      let render = this.render
      let value = this.val
      let current = typeof value === 'number' ? value : 0

      let finish = (self, anim) => {
        self._animating_ = null
        anim.time = duration
        anim.current = anim.end
        anim.end = anim.start
      }

      this.on('remove', function () {
        delete store[this.uid]
      }, 'anim' + this.uid)

      this.define({
        render (val, properties, children, rdata) {
          let uid = this.uid
          if (this._scrolling_) {
            let anim = store[uid]
            if (anim) {
              anim.current = val
              anim.start = val
              anim.end = val
            }
            return render.call(this, val, properties, children, rdata)
          }
          let anim = store[uid] || (store[uid] = {})
          if (val !== anim.end) {
            if (typeof val === 'number') {
              anim.start = anim.current || current
              anim.end = val
              anim.delta = val - anim.start
              anim.time = 0
              this._animating_ = true
            }
          }
          if (anim.time !== anim.duration) {
            anim.current = val = outCubic(anim.time, anim.start, anim.delta, duration)
            if (Math.abs(val - anim.end) > 0) {
              anim.time++
              if (this.rafid) {
                global.cancelAnimationFrame(this.rafid)
                this.rafid = null
              }
              this.rafid = global.requestAnimationFrame(() => {
                this.rafid = null
                this.patch()
              })
            } else {
              finish(this, anim)
            }
          } else {
            finish(this, anim)
          }
          return render.call(this, val, properties, children, rdata)
        }
      })
    } else {
      
    }
  }
}
