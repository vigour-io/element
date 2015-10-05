'use strict'

var Property = require('./')
var body = document.body.base
var id = 'draggable'

body.inject(
  require('../events/move'),
  require('../events/up')
)

exports.inject = [
  require('../events/down'),
  require('./transform')
]

exports.properties = {
  dragging: new Property({
    val: false
  }),

  /**
   * Use draggable this property allow the user to drag objects
   * @type {boolean}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   draggable: true
   * })
   *
   */
  draggable: new Property({
    on: {
      data: function (data, event) {
        if (data !== null) {
          var val = this.val
          var element = this.parent
          var draggable = this

          if (typeof val === 'string') {
            this.setKey(val, true)
          } else if (val === true || (val.y === void 0 && val.x === void 0)) {
            this.set({
              x: true,
              y: true
            })
          }

          if (!element.on || !element._on.down || !element._on.down.draggable) {
            element.set({
              on: {
                down: {
                  draggable: [ function draggableDown (e, event) {
                    var bind = draggable.bind ? draggable.bind._input.call(this, e, event) : this
                    var xbind = draggable.x && draggable.x._input
                    var ybind = draggable.y && draggable.y._input
                    var rect = bind.node.getBoundingClientRect()
                    var startX = rect.left
                    var startY = rect.top
                    var checkpass
                    var ex
                    var ey

                    if (typeof xbind === 'function') {
                      xbind = xbind.apply(this, arguments)
                    } else if (xbind === true) {
                      bind.setKey('x', {
                        val: startX
                      }, event)
                      xbind = bind.x
                    }

                    if (typeof ybind === 'function') {
                      ybind = ybind.apply(this, arguments)
                    } else if (ybind === true) {
                      bind.setKey('y', {
                        val: startY
                      }, event)
                      ybind = bind.y
                    }

                    if (xbind) {
                      xbind.setKey('dragging', true)
                    }
                    if (ybind) {
                      ybind.setKey('dragging', true)
                    }

                    bind.emit('dragstart', e, event)

                    if (xbind || ybind) {
                      checkpass = draggable.pass && draggable.pass._input
                      ex = e.x
                      ey = e.y

                      body.on('move', [ function draggableMove (e, event) {
                        var dx = e.x - ex
                        var dy = e.y - ey

                        e.preventDefault()

                        if (checkpass) {
                          event.dx = dx
                          event.dy = dy
                          if (!checkpass.call(bind, e, event)) {
                            body.off('move', id)
                            body.off('up', id)
                            return
                          }
                          checkpass = false
                        }

                        if (xbind) {
                          xbind.set(~~(startX + dx), event)
                        }
                        if (ybind) {
                          ybind.set(~~(startY + dy), event)
                        }
                      }, bind], id)

                      body.on('up', [ function draggableUp (e, event) {
                        body.off('move', id)
                        body.off('up', id)

                        event.startX = startX
                        event.startY = startY

                        event.endX = e.x
                        event.endY = e.y

                        if (xbind) {
                          xbind.setKey('dragging', false)
                        }
                        if (ybind) {
                          ybind.setKey('dragging', false)
                        }

                        bind.emit('dragend', e, event)
                      }, bind], id)
                    }
                  }, this]
                }
              }
            })
          }
        }
      }
    }
  })
}
