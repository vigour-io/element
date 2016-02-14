// if phone exports.episode = exports['page-video']
exports['page-video'] = {
  player: { type: 'player' },
  info: {
    type: 'info',
    description: {
      type: 'description'
    }
  },
  on: {
    remove: {
      player (e, event) {
        var pl = this.player
        pl._on.removeEmitter.execInternal(pl, event)
      }
    }
  }
}

exports.show = {
  type: 'page',
  css: { inherits: 'type-page-video' },
  title: { type: 'title' },
  hr: {
    type: 'hr'
  },
  wrapper: {
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
  },
  on: {
    remove: {
      player (e, event) {
        var pl = this.video.player
        pl._on.removeEmitter.execInternal(pl, event)
      }
    }
  }
}

exports.channel = {
  type: 'show',
  video: {
    type: 'page-video',
    $: true
  }
}
