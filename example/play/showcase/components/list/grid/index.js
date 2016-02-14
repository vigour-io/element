'use strict'

exports.grid = {
  $collection: 'items',
  Child: {
    item: {
      type: 'item'
    }
  }
}

exports['grid-flex'] = {
  $collection: 'items',
  Child: {
    item: {
      type: 'item-flex'
    }
  }
}

exports['grid-flex-posters'] = {
  $collection: 'items',
  Child: {
    item: {
      type: 'item-flex-poster'
    }
  }
}
