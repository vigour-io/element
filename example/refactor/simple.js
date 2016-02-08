var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')
require('./simple.less')

var _set = Observable.prototype.set

var Cached = new Observable({
  inject: require('../../lib/subscription/stamp'),
  define: {
    $ (val) {
      console.error('lulzzzz', val)
    }
  },
  Child: 'Constructor'
}).Constructor

var bla = global.bla = new Cached({
  a: 10,
  b: 20,
  c: 30,
  james: 100,
  'a:james': {
    val: 100,
    gurk: 'this is a special field! yuzi'
  }
})

var X = global.x = new Element({
  type: 'button',
  text: function () {
    return ' ----' + this.path.join('.')
  },
  on: {
    click () {
      console.log('ok so click wtf..', this.path, this._context)
      this.remove()
    }
  }
}).Constructor

global.x = X.prototype

var T = new Element({
  css: 'holder',
  text () { return 'T:' + this.path.join('/') },
  a: new X,
  b: new X
}).Constructor

global.t = T.prototype

// after that fix the child thing and context updates
var app = global.app = new Element({
  DOM: document.body,
  bla: new T(),
  blurf: new T()
  // xxx: new collectionThing(bla)
})
