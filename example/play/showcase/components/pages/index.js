'use strict'

var merge = require('lodash/object/merge')
merge(exports, require('./discover'))

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
    Child: { type: 'item-flex-progress' }
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

exports['page-video'] = {
  on: {
    remove: {
      player (e, event) {
        var pl = this.player
        pl._on.removeEmitter.execInternal(pl, event)
      }
    }
  },
  player: { type: 'player' },
  info: {
    title: { type: 'title' },
    subtitle: { type: 'subtitle' },
    description: { html: { $: 'description' } }
  }
}

// if phone exports.episode = exports['page-video']
exports.show = {
  on: {
    remove: {
      player (e, event) {
        var pl = this.video.player
        pl._on.removeEmitter.execInternal(pl, event)
      }
    }
  },
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
