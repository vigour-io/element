'use strict'

var isNode = require('vigour-js/lib/util/is/node')
if (!isNode) {
  var Emitter = require('./emitter')
  var doc = require('../document')

  const MOVE = 'move'
  const DOWN = 'down'
  const UP = 'up'

  doc.inject(
    require('../event/move'),
    require('../event/up')
  )

  exports.inject = require('./down')

  exports.on = {
    properties: {
      drag: new Emitter({
        define: {
          generateConstructor: function () {
            return function DerivedEmitter (val, ev, parent, key) {
              parent.setKey(DOWN, {
                drag (e, event) {
                  if (event.prevent) {
                    return
                  } else if (this.getNode()) {
                    let path = this.path
                    let keyx = path.join('.')
                    let engine = event.engine

                    doc.on(MOVE, function (e, docevent) {
                      let rendered = engine.get(path)
                      if (rendered) {
                        rendered._on.drag.execInternal(rendered, event, e)
                      }
                        // engine.cleanContextPath(path)
                    }, keyx)

                    doc.on(UP, function (e, docevent) {
                      let rendered = engine.get(path)
                      if (rendered) {
                        rendered._on.drag.execInternal(rendered, event, e)
                      }
                      engine.cleanContextPath(path)
                      doc.off(MOVE, keyx)
                      doc.off(UP, keyx)
                    }, keyx)
                  }
                }
              }, ev)
              return Emitter.apply(this, arguments)
            }
          }
        }
      })
    }
  }
// add clear context over path in vjs
// make paths super fast to use everywhere -- make it nice
// maybe just use a hash for it -- super short -- store them also use for everything else
// }
}

// var Emitter = require('./emitter')
// var doc = require('../document')
// var ID = 'drag'

// doc.inject(
//   require('../event/move'),
//   require('../event/up')
// )

// exports.inject = require('../event/down')

// exports.on = {
//   properties: {
//     drag: new Emitter({
//       define: {
//         generateConstructor () {
//           return function DerivedEmitter (val, ev, parent, key) {
//             parent.setKey(DOWN, {
//               click (e, event) {
//                 if (event.prevent) {
//                   return
//                 } else if (this.getNode()) {
//                   let path = this.path
//                   let eX = e.x
//                   let eY = e.y
//                   let keyx = path.join('.')
//                   let engine = event.engine
//                   doc.on(UP, function (e, docevent) {
//                     if (eX === e.x && eY === e.y) {
//                       let rendered = engine.get(path)
//                       if (rendered) {
//                         rendered._on.click.execInternal(rendered, event, e)
//                       }
//                       engine.cleanContextPath(path)
//                     }
//                     doc.off(UP, keyx)
//                   }, keyx)
//                 }
//               }
//             }, ev)

//             parent.setKey('down', {
//               drag (e, event) {
//                 this.emit('dragstart', e, event)
//                 doc.on('move', (e, event) => {
//                   this.emit(key, e, event)
//                 }, ID)
//                 doc.on('up', () => {
//                   this.emit('dragend', e)
//                   doc.off('move', ID)
//                   doc.off('up', ID)
//                 }, ID)
//               }
//             }, ev)
//             return Emitter.apply(this, arguments)
//           }
//         }
//       }
//     })
//   }
// }
