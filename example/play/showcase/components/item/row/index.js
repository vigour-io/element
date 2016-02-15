'use strict'

exports['item-row'] = {
  type: 'item',
  css: {
    inherits: 'type-row'
  },
  arrow: {
    order: 1,
    type: 'icon',
    css: {
      icon: 'icon-right'
    }
  }
}

exports['item-row-progress'] = {
  type: 'item-row',
  title: {
    subtitle: {
      css: { inherits: 'type-row' },
      progress: { type: 'progress' }
    }
  },
  on: {
    click () {
      var data = this.state.data
      data.lookUp('currentEpisode').val = data
    }
  }
}
