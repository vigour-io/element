'use strict'
const Observable = require('vigour-observable')
const clearKeys = Observable.prototype.clearKeys
const element = new Observable({
  type: 'element',
  components: {
    property: require('./property')
  },
  properties: {
    node: { val: 'div' },
    namespace: true, // later to props this is weird...
    isElement: { val: true }
  },
  define: {
    clearKeys (target) {
      this._noStates = void 0
      this._noStatesP = void 0
      clearKeys.apply(this, arguments)
    },
    // TODO triple check this stuff
    addNewProperty  (key, val, stamp) {
      if (val.val !== null) {
        this[key] = val
        this.clearKeys(val)
        if (this._Constructor) {
          this.createContextGetter(key)
        }
        // maybe use order?
        val.__index = val.uid()
      }
    },
    keysInternal (keys, field, check) {
      if (!keys && keys !== false) {
        keys = this[field] = []
        let sortbyindex
        let ordered
        let target
        let pindex
        for (let key in this) {
          target = this[key]
          if (key[0] !== '_' && ((target = this[key]), target !== null) && check(this, key, field)) {
            if (!ordered && target.order) {
              ordered = true
            }
            // check if keys need to be sorted by uid
            // if this is true => we need to sort the shit
            if (!sortbyindex) {
              let index = target.__index
              if (index > pindex) {
                sortbyindex = true
              }
              pindex = index
            }
            keys.push(key)
          }
        }
        if (ordered) {
          // @todo: .sort is very slow fix this using a custom qsort
          keys.sort(this.sort.bind(this))
        } else if (sortbyindex) {
          // sort keys by uid
          keys.sort((a, b) => this[a].__index - this[b].__index)
        } else if (!keys[0]) {
          keys = this[field] = false
        }
      }
      return keys
    }
  },
  Child: 'Constructor'
}, false)

element.components.element = element
element.inject(
  require('./render/dom/element'),
  require('./subscribe'),
  require('./property/group'),
  require('./property/class'), // make this optional!
  require('./property/props'),
  require('./property/style'),
  require('./property/text')
)
element.defaultSubscription = 1
module.exports = element.Constructor
