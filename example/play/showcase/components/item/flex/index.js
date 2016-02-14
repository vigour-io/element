'use strict'

exports['item-flex'] = {
  type: 'item',
  title: {
    description: {
      type: 'description-short'
    }
  },
  arrow: {
    order: 1,
    type: 'icon',
    css: 'icon-right'
  }
}

exports['item-flex-poster'] = {
  type: 'item-poster'
}

exports['item-flex-progress'] = {
  type: 'item-flex',
  progress: { type: 'progress' }
}
