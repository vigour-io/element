'use strict'

// can also make base lists if you want, possible to use in this file
exports.grid = {
  $collection: true,
  Child: { type: 'item' }
}

exports['grid-flex'] = {
  $collection: true,
  Child: { type: 'item-flex' }
}

exports.list = {
  $collection: true,
  Child: { type: 'item-row' }
}

exports['list-horizontal'] = {
  $collection: true,
  Child: { type: 'item' }
}

exports['list-discover'] = {
  components: {
    arrow: {
      icon: { type: 'icon', css: 'arrow' },
      on: {
        click () {
          // if this.key === 'left' ?
        }
      }
    }
  },
  left: { type: 'arrow' },
  right: { type: 'arrow' },
  list: { type: 'list-horizontal' }
}
