'use strict'

exports['item-row'] = {
  type: 'item',
  css: {
    inherits: 'css'
  },
  arrow: {
    order: 1,
    type: 'icon',
    css: {
      icon: 'icon-right'
    }
  }
}

exports['item-row-progress'] = {
  type: 'item-row',
  progress: { type: 'progress' }
}
