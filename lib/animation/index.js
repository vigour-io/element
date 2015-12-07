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
    operator (val, op, origin) {
      if (val === null) {
        return
      }
      var dragging = this.dragging && this.dragging.val

      if (!op.current) {
        op.setKey('current', val)
        if (!op.init) {
          op.setKey('init', val)
        }
        if (!op.end) {
          op.setKey('end', val)
        }
      }

      if (op.css) {
        this.parent.set({
          transition: (op.duration.val / 100) + 's all linear'
        })
        return val
      }

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

      var progress = op.progress.val
      var init = op.init.val
      var end = op.end.val
      var duration = op.duration.val
      var easing = op.easing.val
      var current = op.current.val

      if (end !== val) {
        end = op.end.val = val
        init = op.init.val = current
        progress = op.progress.val = 1

        // add listener
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
        // remove listener
        frame.off('data', this)
        // cache emits
        this.parent.emit('transitionEnd')
      }

      return val
    },
    on: {
      new: function (e) {
        if (this.start) {
          // cache current as a end
          this.setKey('end', this.parent.val)

          // set start point on start
          this.parent.val = this.start.val

          // do action
          frame.play()
        }
      }
    }
  })
}
