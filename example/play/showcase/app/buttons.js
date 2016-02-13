'use strict'
var data = require('../data')
exports.buttons = {
  Child: {
    type: 'button-spesh',
    on: {
      click () {
        console.log('swtich', this.key)
        data.state.app.val = data[this.key]
      }
    }
  },
  firstShow: {
    text: 'firstShow',
    on: {
      click () {
        data.state.app.val = data.shows.g()
      }
    }
  },
  episode: {
    text: 'gOt episode 1',
    on: {
      click () {
        data.state.app.val = data.shows.g().seasons.firstChild().g()
      }
    }
  },
  discover: {
    text: 'discover'
  },
  movies: {
    text: 'movies'
  },
  channels: {
    text: 'channels'
  },
  publisher: {
    text: 'chapusblishernnels'
  }
}
