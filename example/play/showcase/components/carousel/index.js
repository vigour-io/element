'use strict'

exports.carousel = {
  type: 'carousel',
  items: {
    $collection: 'items',
    Child: {
      type: 'item-carousel'
    }
  },
  indicator: {
    Child: {}
  }
}

exports['item-carousel'] = {
  type: 'item',
  title: {
    img: { type: 'thumb' }
  }
}
