'use strict'

exports.discover = {
  title: { type: 'title' },
  list: {
    $collection: 'items',
    Child: {
      type: 'list-discover',
      rowcount: {
        text: '2/20' // $: 'length' //phone and web
      },
      button: {
        text: 'All channels' // { $: 'moreButton' } [true/false or a category]
      }
    },
    properties: {
      carousel: {
        type: 'carousel',
        items: {
          $collection: 'items',
          Child: { type: 'item-carousel' } // optional
        }
      },
      actors: { // lets make this into a better category since this is super unclear
        list: { Child: { type: 'item-video' } }
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

// for phone different
