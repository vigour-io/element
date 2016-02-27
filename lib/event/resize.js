'use strict'
var isNode = require('vigour-util/is/node') // use brify system for include (also possible in webpack)
if (!isNode) {
  var Event = require('vigour-event')
  var Emitter = require('vigour-observable/lib/emitter')
  var widget = require('../element/widget')
  var init = widget.widget.init
  var listeners = []
  var cnt = 0
  var onresize = function onresize (e) {
    for (var i = listeners.length - 1; i >= 0; i--) {
      let w = listeners[i]
      let el = w.state.elem
      let ev = new Event('resize')
      el._on.resize.execInternal(el, ev, {
        _rawEvent: e,
        currentTarget: w.node
      })
      ev.trigger()
    }
  }
  exports.on = {
    properties: {
      resize: new Emitter({
        define: {
          generateConstructor: function () {
            return function DerivedEmitter (val, ev, parent, key) {
              var elem = parent.parent
              if (!elem.widget) {
                elem.inject(widget)
                let w = elem.widget.prototype
                w.destroy = function destroy () {
                  let i = listeners.indexOf(this)
                  listeners.splice(i, i + 1)
                  if (!--cnt) {
                    global.removeEventListener('resize', onresize)
                  }
                }
                w.init = function i () {
                  var node = init.apply(this, arguments)
                  if (!cnt++) {
                    global.addEventListener('resize', onresize)
                  }
                  this.node = node
                  listeners.push(this)
                  let el = this.state.elem
                  global.requestAnimationFrame(function () {
                    let ev = new Event('resize')
                    el._on.resize.execInternal(el, ev, {
                      currentTarget: node
                    })
                    ev.trigger()
                  })
                  return node
                }
              }
              return Emitter.apply(this, arguments)
            }
          }
        }
      })
    }
  }
}
