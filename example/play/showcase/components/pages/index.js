'use strict'

var merge = require('lodash/object/merge')
merge(exports, require('./discover'))
merge(exports, require('./video'))

exports.publisher = {
  type: 'discover',
  cover: { type: 'item-cover' }
}

exports.page = {
  css: 'page'
}

exports.shows = {
  type: 'page',
  title: { type: 'title-secondary' },
  hr: { type: 'hr' },
  grid: {
    type: 'grid-flex'
  }
}

exports.movies = {
  type: 'page',
  title: { type: 'title-secondary' },
  hr: { type: 'hr' },
  grid: {
    type: 'grid-flex-posters'
  }
}

exports.channels = {
  type: 'page',
  title: { type: 'title' },
  hr: { type: 'hr' },
  grid: {
    type: 'grid-flex',
    $collection: 'items',
    Child: {
      item: {
        type: 'item-flex-progress'
      }
    }
  }
}

exports.mixed = {
  publishers: {
    type: 'channels',
    $: 'publishers'
  },
  channels: {
    type: 'channels',
    $: 'channels'
  }
}
