var Observable = require('vjs/lib/observable')

var MockNode = function () {}
Observable.prototype.define.call(MockNode.prototype, {
  value: {
    get: function () {
      console.log('get value...')
    },
    set: function ( val ) {
      console.log('write value', val)
    }
  }
})

var SpecialElement = new Observable({
  define: {
    node: {
      get: function () {
        if (!this._node) {
          this._node = new MockNode()
        }
        return this._node
      },
      set: function () {}
    }
  }
}).Constructor

var text = require('../../lib/property/text')

var domString = ''

var bla = new SpecialElement({
  inject: text,
  text: {
    on: {
      change: function () {
        domString
        console.log('a change?', this.val)
      }
    }
  }
})

bla.text.val = 'xxx'
