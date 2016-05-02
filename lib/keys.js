'use strict'
const clearKeys = require('vigour-observable').prototype.clearKeys

exports.properties = {
  insertBefore (val) {
    this.__order = this.parent[val].__order - 0.5
  }
}

exports.define = {
  addNewProperty  (key, val, stamp) {
    if (val.val !== null) {
      this[key] = val
      this.clearKeys(val)
      if (this._Constructor) {
        this.createContextGetter(key)
      }
      if (val.isElement && !val.__order) {
        val.__order = val.uid()
      }
    }
  },
  keysInternal (keys, field, check) {
    if (!keys && keys !== false) {
      keys = this[field] = []
      let prevorder
      let easyorder
      let ordered
      let target
      for (let key in this) {
        target = this[key]
        if (key[0] !== '_' && ((target = this[key]), target !== null) && check(this, key, field)) {
          if (!ordered) {
            if (target.order) {
              ordered = true
            } else if (!easyorder) {
              let order = target.__order
              if (order > prevorder) {
                easyorder = true
              }
              prevorder = order
            }
          }
          // check if keys need to be sorted by uid
          // if this is true => we need to sort the shit
          keys.push(key)
        }
      }
      if (ordered) {
        // @todo: .sort is very slow fix this using a custom qsort
        keys.sort(this.sort.bind(this))
      } else if (easyorder) {
        keys.sort((a, b) => this[a].__order - this[b].__order)
      } if (!keys[0]) {
        keys = this[field] = false
      }
    }
    return keys
  },
  clearKeys (target) {
    this._noStates = void 0
    this._noStatesP = void 0
    clearKeys.apply(this, arguments)
  },
  sort (a, b) {
    let ai = this[a].order || 0
    let bi = this[b].order || 0
    ai = ai.compute && ai.compute() || ai || 0
    bi = bi.compute && bi.compute() || bi || 0
    return ai === bi ? this[a].__order - this[b].__order : ai < bi ? -1 : 1
  }
}
