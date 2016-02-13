'use strict'

exports['item-flex'] = {
  type: 'item',
  description: {
    text: { $: 'description' }
  },
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