'use strict'

exports.discover = {
  title: { type: 'title' },
  list: {
    $collection: 'items',
    Child: { type: 'list-discover' },
    properties: {
      carousel: { Child: { type: 'carousel' } },
      videos: { Child: { type: 'item-video' } },
      channels: { Child: { type: 'item-channel' } }
    }
  }
}

exports.shows = {
  title: { type: 'title' },
  grid: {
    type: 'grid-flex',
    $collection: 'items'
  }
}

exports.channels = {
  title: { type: 'title' },
  grid: {
    type: 'grid',
    $collection: 'items',
    Child: { type: 'item-channel' }
  }
}

exports.movies = {
  title: { type: 'title' },
  grid: {
    type: 'grid',
    $collection: 'items',
    Child: { type: 'item-poster' }
  }
}

exports.mixed = {
  publishers: {
    type: 'list-horizontal',
    $collection: 'publishers'
  },
  channels: {
    type: 'channels',
    $: 'channels'
  }
}
