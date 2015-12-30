// 'use strict'

// var Emitter = require('./emitter')
// var doc = require('../document')
// const CLICK = 'click'
// const DOWN = 'down'
// const UP = 'up'

// doc.inject(require('../event/up'))
// exports.inject = require('./down')

// var globals = require('../engine/dom/globals')

// exports.on = {
//   properties: {
//     click: new Emitter({
//       define: {
//         generateConstructor: function () {
//           return function DerivedEmitter (val, ev, parent, key) {
//             parent.setKey(DOWN, {
//               click (e, event) {
//                 var path = this.path
//                 console.log('fire it now fire it now', DOWN, path)
//                 var eX = e.x
//                 var eY = e.y
//                 var keyx = path.join('.')
//                 doc.on(UP, function (e, event) {
//                   console.log('fire up!')
//                   if (eX === e.x && eY === e.y) {
//                     var _this = globals.app.get(path)
//                     _this.emit(key, e, event)
//                   }
//                   // event.on('close', function () {
//                   doc.off(UP, keyx)
//                   // })
//                   // also dangerous
//                 }, keyx)
//               }
//             }, ev)
//             return Emitter.apply(this, arguments)
//           }
//         }
//       }
//     })
//   }
// }
