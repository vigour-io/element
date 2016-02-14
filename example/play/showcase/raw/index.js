module.exports = {
  // user data created on the client send to user hub
  continue: {
    title: 'Continue Watching',
    items: [
      [ '$', 'movies', 'items', 0 ]
    ]
  },
  subscriptions: {
    title: 'My Subscriptions',
    items: [
      [ '$', 'shows', 'items', 0 ],
      [ '$', 'channels', 'items', 0 ]
    ]
  },
  recommended: {
    'title': 'Recommended for you',
    'items': [
      [ '$', 'movies', 'items', 0 ],
      [ '$', 'shows', 'items', 0 ]
    ]
    // link: [ '$', 'recommended' ]
  },

  // non-user data
  mixed: {
    title: 'Channels',
    channels: [ '$', 'channels' ],
    icon: 'channels',
    publishers: [ '$', 'publishers' ]
  },
  menu: {
    discover: [ '$', 'discover' ],
    shows: [ '$', 'shows' ],
    movies: [ '$', 'movies' ],
    mixed: [ '$', 'mixed' ]
    // channels: [ '$', 'channels' ],
    // subscriptions: [ '$', 'subscriptions' ]
  },
  discover: {
    title: 'Discovery',
    icon: 'discover',
    items: {
      carousel: {
        order: -1,
        items: {
          focus: 0,
          length: 3,
          0: [ '$', 'movies', 'items', '0' ],
          1: [ '$', 'shows', 'items', '0' ],
          2: [ '$', 'shows', 'items', '1' ]
        }
      },
      channels: {
        title: 'Now on TV',
        link: [ '$', 'channels' ], // order is irrelevant now
        items: [
          [ '$', 'channels', 'items', '0' ],
          [ '$', 'channels', 'items', '1' ],
          [ '$', 'channels', 'items', '2' ],
          [ '$', 'channels', 'items', '3' ],
          [ '$', 'channels', 'items', '4' ]
        ]
      },
      // these things are references now
      continue: [ '$', 'continue' ],
      subscriptions: [ '$', 'subscriptions' ],
      'recommended:posters': [ '$', 'recommended' ]
    }
  },
  channels: require('./channels'),
  movies: require('./movies'),
  shows: require('./shows'),
  publishers: require('./publishers')
}
