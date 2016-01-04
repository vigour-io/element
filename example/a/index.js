'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor
var Event = require('vigour-js/lib/event')
require('./style.less')

function defBind () {
  return this.parent.parseValue()
}

function getit (field) {
  return function fieldbind () {
    var self
    if (this._context) {
      self = this._context._self
    }
    if (self) {
      return self.get(field).parseValue()
    }
    return 'bla'
  }
}

var Prop = require('../../lib/property')
Prop.prototype.set({
  properties: {
    $: function (val) {
      this.$ = val
      if (val === true) {
        this.set(defBind)
      } else {
        this.set(getit(val))
      }
    }
  }
})

function addListeners (element, target, attach, event) {
  element.each(function (prop, key) {
    var a = attach
    if (prop.$) {
      console.log('handle $')
      prop.set((prop._self || target).get(prop.$), event)
      a = prop
      // prop.blax(void 0, event)
    }
    addListeners(prop, prop._self || target, attach, event)
    // this can just be done on render -- omg
  }, function (prop, key) {
    if (prop instanceof Prop) {
      if (prop.$) {
        if (target.get(prop.$)) {
          // this is the render of the element ofc
          // subscribe and resolve for nested else get node does not work
          target.get(prop.$).on('data', [ function (data, event) {
            element[key].render(element.getNode(), event, element)
          }, attach])
        } else {
          console.warn('cant find ', prop.$, prop.path)
        }
      }
      return false
    }
    return prop instanceof Element
  })
}

Element.prototype.set({
  define: {
    blax (data, event) {
      console.log('ballz it!', this.path)
      // if (!this._input) {
      //   // HANDLE removal here!
      //   return
      // }
      var select = this.$

      var elem = this
      elem._self = elem.origin
      console.log('yo!', elem.origin)

      // if (select !== true) {
        // console.log(select, elem._self)
        // elem._self = elem._self.get(select)
              // console.log('yo?!', elem.origin)

      // }
      if (elem._self) {
        elem._self.each(function (prop, key) {
          elem = elem.setKey(key, void 0, event)
          elem[key]._self = prop
          addListeners(elem[key], prop, elem, event)
        })
      }
      elem._self.on('property', function (data) {
        console.log(data)
      })
      // handle property changes here -- first we need property datas!
      // this.origin.subscribe(val + '.$property', function () {})
      // event.trigger()
    }
  },
  properties: {
    $: function (val) {
      this.$ = val
      if (val) {
        console.log('xxxxx', val)
        this.on('reference', this.blax)
      }
    }
  }
})


//--------------real-----------
var obs = global.obs = new Observable({})
for (var i = 0; i < 10; i++) {
  obs.setKey(i, {
    text: i,
    nested: 'nest: ' + i,
    shows: {
      1: {
        ballz: 'ballz' + i
      },
      2: {
        ballz: 'ballz' + i * 2
      }
    }
  })
}

var bla = new Element({
  $: true,
  ChildConstructor: new Element({
    text: { $: 'text' },
    bla: {
      text: { $: 'nested' } // add this to one listener
    },
    collectionrandomballz: {
      text: function () {
        return this.parent.key
      },
      $: 'shows',
      ChildConstructor: new Element({
        text: { $: 'ballz' }
      })
    }
  })
})

// app.set({
//   xx: bla
// })
console.time(1)

bla.val = obs

console.timeEnd(1)

console.time(1)
app.set({ bla: bla })
console.timeEnd(1)