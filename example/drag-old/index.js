require('./style.less')

var app = require('../../lib/app')
var Element = require('../../lib/element')
var Observable = require('vigour-js/lib/observable')

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text'),
  require('../../lib/property/backgroundImage'),
  require('../../lib/property/transform'),
  require('../../lib/property/size')
)

// debugger

var customImage = new Observable({
  val: '../../test/properties/1.png'
})

window.thing = thing = new Element({
  key: 'thing',
  opacity: 0.2,
  backgroundImage: {
    val: customImage,
    size: '100px',
    // opaciy:, ?
    on: {
      load: function () {
        this.parent.opacity.val = 1
        // debugger
        console.error('SUCCES', this.path)

      },
      error: function (argument) {
        console.error('ERROR')
        this.loadError = 'error'
      }
    }
  },
  on: {
    down: function (e, event) {
      var rect = this.node.getBoundingClientRect()
      this.startX = rect.left
      this.startY = rect.top
    },

    grab: function (e, event) {
      this.x.val = e.x - 100 // - this.startX
      this.y.val = e.y - 100 // - this.startY
    }
  },
  x: null,
  y: null,
  span: {
    node: 'span',
    text: 'Drag Me!'
  }
})

app.set({
  a: new thing.Constructor({

  })
})

setTimeout(function (argument) {
  thing.backgroundImage.val = 'http://wallpaper.ultradownloads.com.br/45586_Papel-de-Parede-Filhote-de-Cachorro_1024x768.jpg'
}, 2000)

// app.a.backgroundImage.remove()
