require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib/element')
var data = require('../content.json')
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
  require('../../lib/events/click')
)


var Item = new Element({
  titlefield: {
    // node:'input',
    text: {
      $: '../../title'
    },
    // on: {
    //   click (e) {
    //     var hiddeninput = this.lookUp('hiddeninput')
    //     hiddeninput.node.focus()
    //     hiddeninput.text.val = this.text.origin
    //   }
    // }
  },
  descriptionfield: {
    text: {
      $: '../../description'
    }
  }
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
    on: {
      input () {
        var regex = new RegExp(this.node.value, 'i')
        content.each(function (property) {
          property.remove()
        })
        original.unsubscribe()
        original.subscribe({
          shows: {
            $any: {
              $condition: [{
                title (title) {
                  return ~title.val.search(regex)
                }
              }, {
                subtitle (title) {
                  return ~title.val.search(regex)
                }
              }]
            }
          }
        }, function (data) {
          var origin = data.origin
          if (data.data === null) {
            content[origin.key].remove()
          } else {
            content.set({[origin.key]:origin})
          }
        }).run()
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
  // topbar: {
  //   y: 0,
  //   text: {
  //     $: '../../navigation.title',
  //     $add: {
  //       val: scroll,
  //       $transform (val) {
  //         return ' - ' + ~~val
  //       }
  //     }
  //   }
  // },
  list: {
    // scrollTop: {
    //   $: '../../scroll'
    // },
    ChildConstructor: Item,
    $: 'data'
  }
})

original.subscribe({
  $any: {
    $any: {
      $condition: {
        title (title) {
          return true
        }
      }
    }
  }
}, function (data) {
  var origin = data.origin
  if (data.data === null) {
    content[origin.key].remove()
  } else {
    content.set({[origin.key]:origin})
  }
}).run()