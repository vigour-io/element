module.exports = {
  discover: {
    title: 'Discovery',
    items: {
      carousel: {
        order: -1,
        items: [
          [ '$', 'movies', 'items', 'lobster' ],
          [ '$', 'shows', 'items', 'got' ]
        ]
      },
      newontv: {
        title: 'New on TV',
        items: [
          [ '$', 'movies', 'items', 'lobster' ]
        ]
      },
      continue: {
        title: 'Continue Watching',
        items: [
          [ '$', 'movies', 'items', 'lobster' ]
        ]
      },
      subscriptions: {
        title: 'My Subscriptions',
        items: [
          [ '$', 'movies', 'items', 'lobster' ]
        ]
      },
      'recommended:movies': {
        'title': 'Recommended for you',
        'items': [
          [ '$', 'movies', 'items', 'lobster' ],
          [ '$', 'movies', 'items', 'lobster' ],
          [ '$', 'movies', 'items', 'lobster' ],
          [ '$', 'movies', 'items', 'lobster' ],
          [ '$', 'movies', 'items', 'lobster' ],
          [ '$', 'movies', 'items', 'lobster' ]
        ]
      }
    }
  },
  movies: {
    items: {
      lobster: {
        title: 'The Lobster',
        subtitle: '(2009) 201 min',
        img: {
          val: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg',  // 2:1
          thumb: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg', // 4:3
          poster: 'http://t3.gstatic.com/images?q=tbn:ANd9GcSaKfl0Zhblzcs8L1MTgdnhKqKuO8UlsM8gH8d2msIMczbX3hX1' // 2:3
        }
      }
    }
  },
  shows: {
    items: {
      got: {
        title: 'Game of Thrones',
        subtitle: '2 Seasons - 12 Episodes',
        img: {
          val: 'http://static1.squarespace.com/static/528b0a4be4b0d32bd54a0862/t/53a7386be4b04854556bc822/1403467898455/Game-of-Thrones-poster.jpg',
          thumb: 'http://static4.businessinsider.com/image/4f74d5f569bedd863a000012/stark-family-game-of-thrones.jpg'
        }
      }
    }
  }
}
