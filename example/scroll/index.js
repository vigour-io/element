require('vigour-scratch/lib/mixins.less')
require('./style.less')

var Element = require('../../lib/element')

var App = require('../../lib/app')
var app = new App({
  node: document.body
})

Element.prototype.inject(
  require('../../lib/property/text'),
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/scroll/top'),
  require('../../lib/property/scroll/left'),
  require('../../lib/property/transform'),
  require('../../lib/events/click')
)

var thing = new Element({
  key: 'thing',
  image: {}
})

var holder = new Element({
  key: 'holder',
  scrollTop: {
    val: 100,
    // $animation: {
    //   duration: 36
    // }
  }
})

var chooser = new Element({})
var colors = ['yellow', 'orange', 'blue', 'brown', 'pink', 'red']

for (var i = 0; i < colors.length; i = i + 1) {
  var n = new thing.Constructor()
  var m = new Element({
    define: {
      i: i * 300
    },
    on: {
      click: function (ev, event) {
        app.holder.setKey('scrollTop', this.i)
      }
    }
  })
  holder.setKey(colors[i], n)
  chooser.setKey(colors[i], m)
}

app.set({
  holder: new holder.Constructor(),
  chooser: chooser
})

app.set({
  holder: {
    yellow: {
      topbar: {
        text: 'YELLOW',
        css: {
          val: app.holder.scrollTop,
          $transform: function (val) {
            if (this._input.val < 250) {
              return 'topbar sticky'
            } else if (this._input.val < 300) {
              return 'topbar bottom'
            }
            return 'topbar'
          }
        }
      }
    },
    orange: {
      topbar: {
        text: 'ORANGE',
        css: {
          val: app.holder.scrollTop,
          $transform: function (val) {
            if (this._input.val > 550) {
              return 'topbar bottom'
            }
            if (this._input.val > 300) {
              return 'topbar sticky'
            }
            return 'topbar'
          }
        }
      }
    },
    blue: {
      topbar: {
        text: 'BLUE',
        css: {
          val: app.holder.scrollTop,
          $transform: function (val) {
            if (this._input.val > 850) {
              return 'topbar bottom'
            }
            if (this._input.val > 600) {
              return 'topbar sticky'
            }
            return 'topbar'
          }
        }
      }
    },
    brown: {
      topbar: {
        text: 'BROWN',
        css: {
          val: app.holder.scrollTop,
          $transform: function (val) {
            if (this._input.val > 1150) {
              return 'topbar bottom'
            }
            if (this._input.val > 900) {
              return 'topbar sticky'
            }
            return 'topbar'
          }
        }
      }
    },
    pink: {
      topbar: {
        text: 'PINK',
        css: {
          val: app.holder.scrollTop,
          $transform: function (val) {
            if (this._input.val > 1450) {
              return 'topbar bottom'
            }
            if (this._input.val > 1200) {
              return 'topbar sticky'
            }
            return 'topbar'
          }
        }
      }
    },
    red: {
      topbar: {
        text: 'RED'
      }
    }
  }
// arrow:{
//   y:{
//     val:app.holder.scrollTop,
//     $$transform:function( val ){
//       var b = document.body
//       return val * b.offsetHeight/b.scrollHeight/2
//     }
//   }
// }
})
