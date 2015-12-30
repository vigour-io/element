// 'use strict'

// var Emitter = require('./emitter')
// var doc = require('../document')
// const CLICK = 'click'
// const DOWN = 'down'
// const UP = 'up'

// doc.inject(require('../event/up'))
// exports.inject = require('./down')

// exports.on = {
//   properties: {
//     click: new Emitter({
//       define: {
//         generateConstructor: function () {
//           return function DerivedEmitter (val, ev, parent, key) {
//             console.log('xxxxxx')
//             parent.setKey(DOWN, {
//               click (e, event) {
//                 console.log('xxxxxx', event)
//                 var _this = this
//                 var _context = _this._context
//                 var chain = []
//                 var context
//                 while(context) {
//                   chain.push(context)
//                   context = context._context

//                 }


//                 var eX = e.x
//                 var eY = e.y
//                 doc.on(UP, function (e, event) {
//                   console.log('hey yo!', chain)
//                   if (eX === e.x && eY === e.y) {
//                     _this._context = _context
//                     _this.emit(key, e, event)
//                   }
//                   // also dangerous
//                   doc.off(UP, CLICK)
//                 }, CLICK)
//               }
//             }, ev)
//             return Emitter.apply(this, arguments)
//           }
//         }
//       }
//     })
//   }
// }
