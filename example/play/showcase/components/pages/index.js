'use strict'

var merge = require('lodash/object/merge')
merge(exports, require('./discover'))

exports.publisher = {
  type: 'discover',
  cover: { type: 'item-cover' }
}

exports.shows = {
  title: { type: 'secondarytitle' },
  grid: {
    type: 'grid-flex',
    $collection: 'items'
  }
}

exports.movies = {
  title: { type: 'secondarytitle' },
  grid: {
    type: 'grid',
    $collection: 'items',
    Child: { type: 'item-poster' }
  }
}

exports.channels = {
  title: { type: 'title' },
  grid: {
    type: 'grid-flex',
    $collection: 'items',
    Child: { type: 'item-flex-progress' }
  }
}

exports.mixed = {
  title: {
    type: 'title',
    text: { val: 'mixed', $: null }
  },
  publishers: {
    type: 'channels',
    $collection: 'publishers'
  },
  channels: {
    type: 'channels',
    $: 'channels'
  }
}

exports['page-video'] = {
  player: { type: 'player' },
  info: {
    title: { type: 'title' },
    subtitle: { type: 'subtitle' },
    description: { html: { $: 'description' } }
  }
}

// if phone exports.episode = exports['page-video']
exports.show = {
  title: { type: 'title' },
  video: {
    type: 'page-video',
    $: 'currentEpisode'
  },
  list: {
    $: 'currentSeason',
    title: { type: 'title' },
    list: {
      type: 'list',
      Child: { type: 'item-row-progress' }
    }
  }
}

exports.channel = {
  type: 'show',
  video: {
    type: 'page-video',
    $: true
  }
  // list: {
  //   $: 'currentSeason'
  // }
}
