'use strict'

exports.carousel = {
  items: {
    $collection: 'items',
    Child: { type: 'item-carousel' }
  }
}

exports['item-carousel'] = {
  type: 'item'
}
