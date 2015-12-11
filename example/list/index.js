require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib/element')
var data = require('../partial.json')
var App = require('../../lib/app')

Observable.prototype.inject(
  require('vigour-js/lib/operator/subscribe'),
  require('vigour-js/lib/operator/transform'),
  require('vigour-js/lib/operator/add')
)

Element.prototype.inject(
  require('../../lib/property/text'),
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/scroll/top'),
  require('../../lib/property/scroll/left'),
  require('../../lib/property/transform'),
  require('../../lib/property/attributes'),
  require('../../lib/events/click')
)


var Item = new Element({
  titlefield: {
    // node:'input',
    text: {
      val:'smur'
      // $: '../../title'
    },
    // on: {
    //   click (e) {
    //     var hiddeninput = this.lookUp('hiddeninput')
    //     hiddeninput.node.focus()
    //     hiddeninput.text.val = this.text.origin
    //   }
    // }
  },
  // descriptionfield: {
  //   text: {
  //     $: '../../description'
  //   }
  // }
})

var focus

function focusSomething () {
  var elem = document.elementFromPoint(100, 140)
  if (elem !== focus) {
    if (focus && focus.base) focus.base.setKey('css', '')
    focus = elem
    if (elem.base) {
      elem.base.setKey('css', 'focused')
      elem.base.lookUp('navigation').val = elem.base.lookUp('_input')
    }
  }
}

var scroll = new Observable({
  key: 'scrollMagic',
  val: 180,
  on: {
    data () {
      focusSomething()
    }
  }
})

var original = new Observable(data)
var content = new Observable()

var app = new App({
  node: document.body,
  inputfield: {
    node: 'input',
    attributes: {
      placeholder: 'Search'
    },
    on: {
      input () {
        var value = this.node.value
        var regex = new RegExp(this.node.value, 'i')
        console.info('query:',value)
        console.time('removeItems')
        content.clear()
        console.timeEnd('removeItems')
        console.time('unsubscribe')
        original.unsubscribe()
        console.timeEnd('unsubscribe')
        console.time('subscribe')
        var sub = original.subscribe({
          shows: {
            $any: {
              $condition: {
                title (title) {
                  return ~title.val.search(regex)
                }
              }
            }
          }
        }, function (data) {
          var origin = data[0].origin
          if (data.data === null) {
            console.time('removeItem')
            content[origin.key].remove()
            console.timeEnd('removeItem')
          } else {
            console.time('addToContent')
            content.set({[origin.key]: origin})
            console.timeEnd('addToContent')
          }
        })
        console.timeEnd('subscribe')
        console.time('run')
        sub.run()
        console.timeEnd('run')
      }
    }
  },
  properties: {
    data: new Observable(),
    navigation: new Observable(),
    scroll: new Observable()
  },
  navigation: new Observable({
    title: 'Home'
  }),
  data: content,
  scroll: scroll,
  list: {
    ChildConstructor: Item,
    $: 'data'
  }
})

original.subscribe({
  shows: {
    $any: {
      $condition: {
        title (title) {
          return true
        }
      }
    }
  }
}, function (data) {
  var origin = data[0].origin
  if (data.data === null) {
    content[origin.key].remove()
  } else {
    content.set({[origin.key]:origin})
  }
}).run()
