'use strict'

// can also make base lists if you want, possible to use in this file
exports.grid = {
  $collection: 'items',
  Child: { type: 'item' }
}

exports['grid-flex'] = {
  $collection: 'items',
  Child: { type: 'item-flex' }
}

exports.list = {
  $collection: 'items',
  Child: { type: 'item-row' }
}

exports['list-horizontal'] = {
  $: true,
  title: { type: 'title' },
  list: {
    $collection: 'items',
    Child: { type: 'item' }
  }
}

exports['list-discover'] = {
  type: 'list-horizontal',
  css: { inherits: 'type-list-horizontal' },
  arrows: {
    Child: { type: 'icon' },
    left: { css: 'icon-left' },
    right: { css: 'icon-right' }
  }
}
