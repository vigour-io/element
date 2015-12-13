'use strict'

var Property = require('./')
var doc = require('../document')
var id = 'draggable'

doc.inject(
  require('../events/move'),
  require('../events/up')
)

exports.inject = [
  require('../events/down'),
  require('./transform')
]

exports.properties = {
  dragging: true,
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
      data (data, event) {
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
                    var node = bind.node
                    // var rect = bind.node.getBoundingClientRect()
                    // NOTE clientLeft & clientTop gives more accurate positioning then getBoundingClientRect()
                    var startX = this.x ? this.x.val : node.clientLeft // rect.left
                    var startY = this.y ? this.y.val : node.clientTop // rect.top

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
                      let checkpass = draggable.pass && draggable.pass._input
                      let ex = e.x
                      let ey = e.y
                      let x, y
                      doc.on('move', [ function draggableMove (e, event) {
                        var dx = e.x - ex
                        var dy = e.y - ey

                        e.preventDefault()

                        if (checkpass) {
                          event.dx = dx
                          event.dy = dy
                          if (!checkpass.call(bind, e, event)) {
                            doc.off('move', id)
                            doc.off('up', id)
                            return
                          }
                          checkpass = false
                        }

                        if (xbind) {
                          x = ~~(startX + dx)
                          xbind.set(x)
                        }
                        if (ybind) {
                          y = ~~(startY + dy)
                          ybind.set(y)
                        }
                      }, bind], id)

                      doc.on('up', [ function draggableUp (e, event) {
                        doc.off('move', id)
                        doc.off('up', id)

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
