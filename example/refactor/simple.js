var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')
require('./todo.less')

var _set = Observable.prototype.set

var Cached = new Observable({
  properties: {
    _lstamp: true
  },
  define: {
    set (val, event) {
      var changed = _set.apply(this, arguments)
      if (changed && event) {
        console.log('obs change set lstamp')
        var parent = this
        while (parent) {
          parent._lstamp = event.stamp
          parent = parent._parent
        }
        // this._lstamp = event.stamp
      }
      return changed
    }
  },
  Child: 'Constructor'
}).Constructor

var bla = global.bla = new Cached(20)

var app = new Element({
  DOM: document.body,
  bla: {
    text: bla
  }
})



