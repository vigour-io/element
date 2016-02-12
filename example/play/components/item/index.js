'use strict'
exports.item = {
  img: { type: 'thumb' },
  title: { type: 'title' },
  subtitle: { type: 'subtitle' },
  on: {
    click () {
      console.error('!!!', this.path)
    }
  }
}

exports['item-flex'] = {
  type: 'item',
  description: {
    text: { $: 'description' }
  }
}

exports['item-row'] = {
  type: 'item',
  arrow: { type: 'icon', css: 'arrow' }
}

exports['item-carousel'] = {
  type: 'item'
}

exports['item-video'] = {
  type: 'item',
  css: { inherits: 'type-item' },
  progress: { type: 'progress' }
}

exports['item-channel'] = {
  type: 'item-video'
}

exports['item-poster'] = {
  type: 'item',
  css: { inherits: 'type-item' },
  img: { type: 'poster' }
}
