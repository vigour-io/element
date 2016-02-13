module.exports = {
  discover: {
    title: 'Discovery',
    items: {
      // carousel: {
      //   order: -1,
      //   items: [
      //     [ '$', 'movies', 'items', 'lobster' ],
      //     [ '$', 'shows', 'items', 'got' ]
      //   ]
      // },
      channels: {
        link: [ '$', 'channels' ],
        title: 'New on TV',
        items: [
          [ '$', 'channels', 'items', 'adb' ]
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
      'recommended:posters': {
        'title': 'Recommended for you',
        'items': [
          [ '$', 'movies', 'items', 'lobster' ],
          [ '$', 'shows', 'items', 'got' ],
          [ '$', 'movies', 'items', 'sw' ],
          [ '$', 'movies', 'items', 'lobster' ],
          [ '$', 'movies', 'items', 'lobster' ],
          [ '$', 'movies', 'items', 'lobster' ]
        ]
      }
    }
  },
  channels: {
    title: 'Channels',
    items: {
      adb: {
        title: 'Abu Dahbi HD',
        current: {
          title: 'Riksons show',
          time: 0.5,
          subtitle: '18:30 - 19:00'
        },
        img: {
          thumb: 'http://www.dubaichronicle.com/wp-content/uploads/2009/07/AD-HD-Logo.jpg'
        }
      }
    }
  },
  movies: {
    title: 'Movies',
    items: {
      lobster: {
        title: 'The Lobster',
        subtitle: '(2009) 201 min',
        time: 0.5, // default s 0
        img: {
          val: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg',  // 2:1
          thumb: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg', // 4:3
          poster: 'http://t3.gstatic.com/images?q=tbn:ANd9GcSaKfl0Zhblzcs8L1MTgdnhKqKuO8UlsM8gH8d2msIMczbX3hX1' // 2:3
        }
      },
      sw: {
        title: 'Star Wars: The Force Awakens',
        subtitle: '(2009) 201 min',
        time: 0.5, // default s 0
        img: {
          val: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg',  // 2:1
          thumb: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg', // 4:3
          poster: 'http://a.dilcdn.com/bl/wp-content/uploads/sites/6/2015/10/star-wars-force-awakens-official-poster.jpg' // 2:3
        }
      },
      h8: {
        title: 'The Lobster',
        subtitle: '(2009) 201 min',
        time: 0.5, // default s 0
        img: {
          val: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg',  // 2:1
          thumb: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg', // 4:3
          poster: 'https://upload.wikimedia.org/wikipedia/en/d/d4/The_Hateful_Eight.jpg' // 2:3
        }
      }
    }
  },
  shows: {
    title: 'Shows',
    items: {
      got: {
        title: 'Game of Thrones',
        subtitle: '2 Seasons - 12 Episodes',
        img: {
          val: 'http://static1.squarespace.com/static/528b0a4be4b0d32bd54a0862/t/53a7386be4b04854556bc822/1403467898455/Game-of-Thrones-poster.jpg',
          thumb: 'http://static4.businessinsider.com/image/4f74d5f569bedd863a000012/stark-family-game-of-thrones.jpg',
          poster: 'http://www.hollywoodreporter.com/sites/default/files/2011/03/got_-_official_poster.jpg' // 2:3
        }
      },
      got: {
        title: 'Game of Thrones',
        subtitle: '2 Seasons - 12 Episodes',
        img: {
          val: 'http://static1.squarespace.com/static/528b0a4be4b0d32bd54a0862/t/53a7386be4b04854556bc822/1403467898455/Game-of-Thrones-poster.jpg',
          thumb: 'http://static4.businessinsider.com/image/4f74d5f569bedd863a000012/stark-family-game-of-thrones.jpg',
          poster: 'http://www.hollywoodreporter.com/sites/default/files/2011/03/got_-_official_poster.jpg' // 2:3
        }
      },
      got: {
        title: 'Game of Thrones',
        subtitle: '2 Seasons - 12 Episodes',
        img: {
          val: 'http://static1.squarespace.com/static/528b0a4be4b0d32bd54a0862/t/53a7386be4b04854556bc822/1403467898455/Game-of-Thrones-poster.jpg',
          thumb: 'http://static4.businessinsider.com/image/4f74d5f569bedd863a000012/stark-family-game-of-thrones.jpg',
          poster: 'http://www.hollywoodreporter.com/sites/default/files/2011/03/got_-_official_poster.jpg' // 2:3
        }
      }
    }
  }
}
