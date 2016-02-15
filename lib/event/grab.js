'use strict'
var isNode = require('vigour-js/lib/util/is/node')
if (!isNode) {
  var delegator = require('./delegator')
  var Event = require('vigour-js/lib/event')
  var Emitter = require('vigour-js/lib/emitter')
  var parseEvent = require('./util').parseEvent
  var cases = require('../cases')
  var isTouch = cases.$touch.val

  var ua = require('../ua')
  var PREFIX = ua.prefix
  var TRANSITION = PREFIX + 'Transition'
  var PROPERTY = TRANSITION + 'Property'
  var DURATION = TRANSITION + 'Duration'
  var TRANSFORM = PREFIX + 'Transform'

  var DOWN = 'down'
  var MOVE = isTouch ? 'touchmove' : 'mousemove'
  var UP = isTouch ? 'touchend' : 'mouseup'

  delegator.listenTo(MOVE)

  exports.inject = require('./down')

  exports.on = {
    properties: {
      grab: new Emitter({
        define: {
          generateConstructor: function () {
            return function DerivedEmitter (val, ev, parent, key) {
              parent.setKey(DOWN, {
                grab (e, event) {
                  var currentTarget = e.currentTarget
                  var store = this.storeContext()
                  var self = this

                  var style = currentTarget.style
                  var transition = style[PROPERTY]
                  var duration = style[DURATION]
                  if (transition) {
                    style[PROPERTY] = null
                    style[DURATION] = null
                  }
                  var usePercentage
                  var width
                  var transform = style[TRANSFORM]
                  var translate
                  var x = 0
                  var pre
                  var post

                  e.preventDefault()

                  if (transform) {
                    let arr = transform.split('(')
                    let indexOfPx = arr[1].indexOf('px')
                    let indexOfPerc = arr[1].indexOf('%')
                    let index
                    usePercentage = indexOfPerc < indexOfPx
                    if (usePercentage) {
                      width = currentTarget.getBoundingClientRect().width
                      index = indexOfPerc
                      translate = function (newdelta) {
                        style[TRANSFORM] = pre + (x + newdelta / width * 100) + post
                      }
                    } else {
                      index = indexOfPx
                      translate = function (newdelta) {
                        style[TRANSFORM] = pre + (x + newdelta) + post
                      }
                    }
                    pre = arr[0] + '('
                    x = Number(arr[1].slice(0, index))
                    post = arr[1].slice(index)
                  } else {
                    console.info('grabbed item should use transform3d')
                    return
                  }

                  var start = parseEvent(e).x
                  var speed
                  var delta

                  var grabmove = function grabmove (e) {
                    var evt = new Event(key)
                    var newdelta = parseEvent(e).x - start

                    translate(newdelta)

                    speed = newdelta - delta
                    delta = newdelta

                    e = parseEvent(e)

                    e.currentTarget = currentTarget
                    e.delta = delta
                    e.speed = speed

                    self.applyContext(store)
                    self._on.grab.execInternal(self, evt, e)
                    evt.remove()
                  }

                  var grabend = function grabend (e) {
                    if (Math.abs(delta) > 1) {
                      e._rawEvent.preventClick = true
                    }
                    var evt = new Event(key)

                    if (transition) {
                      style[PROPERTY] = transition
                      style[DURATION] = duration
                    }

                    e = parseEvent(e)

                    e.restore = function () {
                      style[TRANSFORM] = transform
                    }

                    e.currentTarget = currentTarget
                    e.delta = delta
                    e.speed = speed

                    self.applyContext(store)
                    self._on.grab.execInternal(self, evt, e)
                    
                    if (self._on.grabend) {
                      self._on.grabend.execInternal(self, evt, e)
                    }

                    evt.remove()

                    delegator.removeGlobalEventListener(MOVE, grabmove)
                    delegator.removeGlobalEventListener(UP, grabend)
                  }

                  delegator.addGlobalEventListener(MOVE, grabmove)
                  delegator.addGlobalEventListener(UP, grabend)
                }
              }, ev)
              return Emitter.apply(this, arguments)
            }
          }
        }
      })
    }
  }
}
