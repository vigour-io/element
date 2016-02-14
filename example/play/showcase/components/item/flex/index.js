'use strict'

exports['item-flex'] = {
  type: 'item',
  title: { description: { type: 'description' } },
  arrow: {
    order: 1,
    type: 'icon',
    css: 'icon-right'
  }
}

exports['item-flex-progress'] = {
  type: 'item-flex',
  progress: { type: 'progress' }
}
