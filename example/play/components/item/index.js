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
  },
  arrow: { type: 'icon', css: 'arrow' }
}

exports['item-flex-progress'] = {
  type: 'item-flex',
  progress: { type: 'progress' }
}

exports['item-row'] = {
  type: 'item',
  arrow: { type: 'icon', css: 'arrow' }
}

exports['item-row-progress'] = {
  type: 'item-row',
  progress: { type: 'progress' }
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

exports['item-cover'] = {
  background: { $: 'img' },
  logo: {
    type: 'img',
    src: { $: 'logo' }
  },
  description: { text: { $: 'description' } }
}
