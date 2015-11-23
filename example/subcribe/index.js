require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib/element')

var App = require('../../lib/app')
var app = new App({
  node: document.body
})

var Property = require('../../lib/property')

Property.prototype.inject(
  require('../../lib/animation'),
  require('vigour-js/lib/operator/subscribe')
)

Element.prototype.inject(
  require('../../lib/property/text'),
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/scroll/top'),
  require('../../lib/property/scroll/left'),
  require('../../lib/property/transform'),
  require('../../lib/events/click')
)

var FirstShowTitle = new Element({
  text: {
    $: 'content.shows.first.title'
  }
}).Constructor

var RandomChannelTitle = new Element({
  text: {
    $: 'content.channels.random.title'
  }
}).Constructor

var SomeUIElement = new Element({
  nested: {
    somewhere: {
      nomatter: {
        where: new FirstShowTitle()
      }
    }
  },
  completely: {
    somewhere: {
      elsewhere: {
        perhaps: {
          even: {
            very: {
              far: {
                away: new RandomChannelTitle()
              }
            }
          }
        }
      }
    }
  }
}).Constructor

var Hub = new Observable().Constructor

var userView = new Hub()

app.set({
  val: new Observable({
    content: {
      shows: {
        first: {
          title: 'hey'
        }
      },
      channels: {
        random: {
          title: 'nerdje'
        }
      }
    }
  }),
  container: new SomeUIElement(),
  container2: new SomeUIElement(),
  randomTitle: new RandomChannelTitle(),
  nested: {
    firstTitle: new FirstShowTitle(),
    anotherFirstTitle: new FirstShowTitle()
  },
  firstTitle: new FirstShowTitle(),
  anotherFirstTitle: new FirstShowTitle(),
  anotherThing: new SomeUIElement(),
  pleaseStop: {
    text: 'start madness',
    on: {
      click() {
        if(this.a){
          clearInterval(this.a)
          clearInterval(this.b)
          this.a = false
          this.text.val = 'start madness'
          this.node.style.backgroundColor = 'green'
        }else{
          this.text.val = 'stop madness'
          this.node.style.backgroundColor = 'red'
          this.a = setInterval(function () {
            if (Math.random() > 0.1) {
              app.val.content.set({
                shows: {
                  first: {
                    title: 'True Detective' + Math.random()
                  }
                }
              })
            }
            if (Math.random() > 0.1) {
              app.val.content.set({
                channels: {
                  random: {
                    title: 'MTV 24H Channel' + Math.random()
                  }
                }
              })
            }
          }, 5)

          this.b = setInterval(function () {
            if (Math.random() > 0.8) {
              if (app.val.content.shows) {
                app.val.content.shows.remove()
              }
            }
            if (Math.random() > 0.8) {
              if (app.val.content.channels) {
                app.val.content.channels.remove()
              }
            }
          }, 9)
        }
      }
    }
  }
})
