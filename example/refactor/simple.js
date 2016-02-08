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
  xx: {
    xy: 20,
    z: 20
  },
  james: 100,
  'a:james': {
    val: 100,
    gurk: 'this is a special field! yuzi'
  }
})

global.yuzi = new Cached('hello')

var X = global.x = new Element({
  yx: {
    xx: {
      bla: {
        $: true
      },
      text: {
        val: global.yuzi
      }
    }
  },
  a: {
    type: 'button',
    text: { $: true, $add: ' its a buttn!' },
    on: {
      click () {
        console.log('ok so click wtf..', this.path, this._context)
        this.parent.remove()
      }
    }
  }
}).Constructor

global.x = X.prototype

var T = new Element({
  css: 'holder',
  text () { return 'T:' + this.path.join('/') },
  a: new X,
  b: new X,
  hello: {
    text: global.yuzi
  }
}).Constructor

global.t = T.prototype

global.h = new Cached({
  a: {
    'a.a': 'a.a',
    'a.b': 'a.b'
  },
  b: {
    'a.b': 'a.b',
    'b.b': 'b.b'
  }
})

var Holder = new Element({
  holder: {
    $collection: true,
    Child: new X()
  }
  // text: global.yuzi
}).Constructor

var Y = new Element({
  Child: {
    xx: new Holder()
  },
  $collection: true
}).Constructor
// after that fix the child thing and context updates
var app = global.app = new Element({
  DOM: document.body,
  key: 'app',
  bla: new Y(global.h)
})
