'use strict'

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
