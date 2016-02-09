var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')
require('./simple.less')

// var Operator = require('vigour-js/lib/operator')
// Operator.prototype.inject(require('../../lib/subscription/stamp'))

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

global.yuzi = new Cached('yuzi (var)')
global.james = new Cached('james (var)')

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
    text: { $: true, $add: ' its a buttn!' }, //lets read out operators
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
    'a_a': 'a_a',
    'a_b': 'a_b'
  },
  b: {
    'b_a': 'b_a',
    'b_b': 'b_b',
    'bla:thing': 'ITS A THING'
  },
  ref: {}
})

h.ref.val = global.h.a

var Thing = new Element({
  type: 'h1',
  blurf: {
    text: { $: true, $add: global.james }
  },
  col: {
    text: 'nested col! over parent.parent.ref'
  },
  bla: {
    col: { // not rendered why?
      text: 'gurkens!'
    },
    $collection: 'parent.parent.ref',
    Child: {
      text: { $: true }
    }
  }
}).Constructor

console.error('THING:', Thing.prototype)

// ref does not update parent subscription kinda makes sense... have to do something about it
// maybe just add the ref on the parent or something?
// extra subs something like that

var Holder = new Element({
  holder: {
    $collection: true,
    Child: new X(),
    properties: {
      thing: Thing
    }
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
var app = global.app = new Element({ //eslint-disable-line
  DOM: document.body,
  key: 'app',
  bla: new Y(global.h),
  button: {
    type: 'button',
    text: {
      $prepend: 'switch:',
      val: global.h.ref,
      $transform (val) {
        return typeof this._input === 'object' ? val + ' ' + this.origin.path.join('.') : val
      }
    },
    on: {
      click () {
        global.h.ref.val = global.h.ref.origin.key === 'a' ? global.h.b : global.h.a
      }
    }
  }
})
