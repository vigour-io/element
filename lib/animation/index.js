'use strict'
var Operator = require('vigour-js/lib/operator')
var ease = require('./easing')
var frame = require('./frame')

const ID = 'animation'

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
        // TODO this is a quick fix
        if (val !== current) {
          this.parent.emit('transitionEnd')
        }
      }

      return val
    },

    on: {
      new (event) {
        var start = this.start
        if (start) {
          // cache current as a end
          let parent = this.parent
          this.setKey('end', parent.val, event)

          // set start point on start
          parent.set(start.val, event)

          this.once('render', function () {
            // do action
            frame.play()
          }, ID, false, event)
        }
      }
    }
  })
}
