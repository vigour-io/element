'use strict'
var Observable = require('vigour-js/lib/observable')
var Operator = require('vigour-js/lib/operator')
var ua = require('../ua')
var prototypes = []
var defaultCases = [
  'phone',
  'tablet',
  'tv',
  'desktop',
  'ios',
  'android',
  'windows',
  'mac',
  'chromecast'
]

var Case = new Operator({
  properties: {
    case: new Observable({
      on: {
        data (data, event) {
          this.parent.emit('data', data, event)
        }
      }
    })
  },
  operator (val, event, operator, origin) {
    return operator.case.parseValue(void 0, event, origin)
      ? operator.parseValue(val, event, origin)
      : val
  }
}).Constructor

module.exports = exports = new Observable({
  on: {
    data (data, event) {
      console.log('drol', prototypes)
      var length = prototypes.length
      if (length) {
        let i = length - 1
        let set = data
        let obj = {}
        for (let property in set) {
          console.log('-',property, this[property])
          obj[property] = new Case({
            case: this[property]
          }, event)
        }

        for (; i >= 0; i--) {
          prototypes[i].inject({
            properties: obj
          })
        }
      }
    }
  }
})

exports.injectable = function (base) {
  base.inject(require('vigour-js/lib/operator/val'))
  prototypes.push(base)
  setDefaultCases(base)
}

function setDefaultCases (base) {
  var i = defaultCases.length - 1
  var str
  var property
  var set = exports._defaultCases

  console.log('set?',set)

  if (!set) {
    set = {
      $native: !!window.cordova,
      $touch: (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch) || navigator.msMaxTouchPoints || false
    }

    for (; i >= 0; i--) {
      str = defaultCases[i]
      str = '' + str
      set['$' + str] = !!(ua.device === str || ua.platform === str)
    }

    exports._defaultCases = set
  }

  if (base) {
    let cases = {}
    for (property in set) {
      if (!base.properties[property]) {
        cases[property] = new Case({
          case: set[property]
        })
      }
    }
    console.log('add to props', base, cases)
    base.set({
      properties: cases
    })
  } else {
    console.log('set the cases', set)
    exports.set(set)
  }
}

setDefaultCases()
