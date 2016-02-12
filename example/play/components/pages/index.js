'use strict'

exports.discover = {
  title: { type: 'title' },
  list: {
    $collection: 'items',
    Child: { type: 'list-discover' },
    properties: {
      carousel: {
        type: 'carousel',
        items: {
          $collection: 'items',
          Child: { type: 'item-carousel' } // optional
        },
        css: 'ui-center ui-background-secondary' // refactor these names a
      },
      actors: {
        list: { Child: { type: 'item-poster' } }
      },
      movies: {
        list: { Child: { type: 'item-poster' } }
      },
      continue: {
        list: { Child: { type: 'item-video' } }
      },
      videos: {
        list: { Child: { type: 'item-video' } }
      },
      channels: {
        list: { Child: { type: 'item-channel' } }
      }
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
    type: 'grid-flex',
    $collection: 'items',
    Child: { type: 'item-flex-progress' }
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
  title: {
    type: 'title',
    text: { val: 'mixed', $: null }
  },
  publishers: {
    type: 'list-horizontal',
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

// for phone different
