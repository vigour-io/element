var Operator = require('vjs/lib/operator')
var ease = require('./easing')
var frame = require('./frame')

exports.properties = {
  $animation: new Operator({
    key: '$animation',
    // properties: {
    //   duration: true,
    //   easing: true,
    //   progress: true,
    //   frameKey: true,
    // },
    operator: function (val, op, origin) {
      // var dragging = this.dragging && this.dragging.val

      // console.log(this.path)

      if (!op.current) {
        // console.log(val)
        op.current = val
        // op.setKey('current', val)

        if (!op.init) {
          op.init = val
          // op.setKey('init', val)
        }

        if (!op.end) {
          op.end = val
          // op.setKey('end', val)
        }

        if(!op.duration) {
          op.duration = 30
        }
      }

      if(!op.progress) {
        op.progress = 0
      }

      // if (op.css) {
      //   this.parent.set({
      //     transition: (op.duration / 100) + 's all linear'
      //   })
      //   return val
      // }

      // if (dragging) {
      //   op.init = val
      //   op.end.val = val
      //   op.current.val = val
      //   return val
      // }

      if (frame.rafId !== op.frameKey) {
        // console.log('????', op.progress.val + 1)
        // op.setKey('progress', op.progress.val + 1)
        // op.setKey('frameKey', frame.rafId)
        // op.set({
        //   progress: op.progress.val + 1,
        //   frameKey: frame.rafId
        // })
        op.progress = op.progress + 1
        op.frameKey = frame.rafId
      }

      var progress = op.progress
      var init = op.init
      var end = op.end
      var duration = op.duration
      var easing = op.easing || 'outCubic'
      var current = op.current

      // console.log(val)
      if (end !== val) {
        // console.log('add listener', val, end)

        end = op.end = val
        init = op.init = current
        if (!op.progress) {
          progress = op.progress = 1
        }

        // add listener
        // this is wrong for instances
        // var t = this
        // op._parent.clearContextUp()
        // console.warn( this.path, op._parent.path )
        // console.log('will he resolve now?')

        // this.on('data', function() {
        //   console.warn('fire it!', this.path)
        // })

        // console.log('will he resolve now?')
        frame.on('data', this)
      }

      if (progress > duration) {
        throw new Error('progress > duration ')
        // this.clearContext()
        // frame.off('data', op)

        return val
      }



      op.current = val = ease[easing](
        progress,
        init,
        end - init,
        duration
      )

      if (progress === duration) {
        // remove listener
        // console.error('remove listener')

        // op.progress = 0

        frame.off('data', this)
        // cache emits
        // maybe use done (more generic)
        this.emit('transitionEnd')
      }

      return val
    },
    on: {
      data: function (data, event) {
        console.error('????', data, this.path)
      }
    }
    // on: {
    //   // replace with render
    //   new: function (instance, event, operator) {
    //     if (operator.start) {
    //       // cache current as a end
    //
    //       // operator.setKey('end', operator.parent.val)
    //       // set start point on start
    //       operator.parent.val = operator.start.val
    //       // do action
    //       frame.play()
    //     }
    //   }
    // }
  })
}
