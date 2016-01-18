'use strict'
var Operator = require('vigour-js/lib/operator')
var ease = require('./easing')
var frame = require('./frame')

exports.inject = require('vigour-js/lib/operator/val')

exports.properties = {
  $animation: new Operator({
    key: '$animation',
    duration: 60,
    easing: 'outCubic',
    progress: 0,
    frameKey: 0,
    start: 0,
    operator (val, event, op, origin) {
      var dragging = this.dragging
      if (!op.current) {
        op.setKey('current', val)
        if (!op.init) {
          op.setKey('init', val)
        }
        if (!op.end) {
          op.setKey('end', val)
        }
      }

      // if (op.css) {
      //   this.parent.set({
      //     transition: (op.duration.val / 100) + 's all linear'
      //   })
      //   return val
      // }

      if (dragging) {
        op.init.val = val
        op.end.val = val
        op.current.val = val
        return val
      }

      if (frame.rafId !== op.frameKey.val) {
        op.setKey('progress', op.progress.val + 1)
        op.setKey('frameKey', frame.rafId)
      }

      let progress = op.progress.val
      let init = op.init.val
      let end = op.end.val
      let duration = op.duration.val
      let easing = op.easing.val
      let current = op.current.val

      if (end !== val) {
        end = op.end.val = val
        init = op.init.val = current
        progress = op.progress.val = 1
        frame.on('data', this)
      }

      if (progress > duration) {
        return val
      }

      op.current.val = val = ease[easing](
        progress,
        init,
        end - init,
        duration
      )

      if (progress === duration) {
        frame.off('data', this)
        if (val !== current) {
          this.parent.emit('transitionEnd')
        }
      }

      return val
    }
  })
}
