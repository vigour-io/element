var descriptions = require('./descriptions.js')

module.exports = {
  // user data created on the client send to user hub
  continue: {
    title: 'Continue Watching',
    items: [
      [ '$', 'movies', 'items', 'lobster' ],
      [ '$', 'shows', 'items', 'got' ],
      [ '$', 'shows', 'items', 'lilyhammer' ],
      [ '$', 'shows', 'items', 'lilyhammer' ],
      [ '$', 'shows', 'items', 'got' ],
      [ '$', 'movies', 'items', 'sw' ],
      [ '$', 'movies', 'items', 'h8' ]
    ]
  },
  subscriptions: {
    title: 'My Subscriptions',
    items: [
      [ '$', 'shows', 'items', 'got' ],
      [ '$', 'shows', 'items', 'got' ],
      [ '$', 'shows', 'items', 'lilyhammer' ],
      [ '$', 'shows', 'items', 'lilyhammer' ],
      [ '$', 'shows', 'items', 'got' ],
      [ '$', 'shows', 'items', 'lilyhammer' ],
      [ '$', 'shows', 'items', 'lilyhammer' ],
      [ '$', 'shows', 'items', 'lilyhammer' ]
    ]
  },
  recommended: {
    'title': 'Recommended for you',
    'items': [
      [ '$', 'movies', 'items', 'lobster' ],
      [ '$', 'shows', 'items', 'got' ],
      [ '$', 'movies', 'items', 'sw' ],
      [ '$', 'movies', 'items', 'h8' ],
      [ '$', 'shows', 'items', 'lilyhammer' ],
      [ '$', 'movies', 'items', 'lobster' ],
      [ '$', 'movies', 'items', 'lobster' ],
      [ '$', 'shows', 'items', 'got' ],
      [ '$', 'movies', 'items', 'sw' ],
      [ '$', 'movies', 'items', 'h8' ],
      [ '$', 'shows', 'items', 'lilyhammer' ],
      [ '$', 'movies', 'items', 'lobster' ],
      [ '$', 'movies', 'items', 'lobster' ],
      [ '$', 'shows', 'items', 'got' ],
      [ '$', 'movies', 'items', 'sw' ],
      [ '$', 'movies', 'items', 'h8' ],
      [ '$', 'shows', 'items', 'lilyhammer' ],
      [ '$', 'movies', 'items', 'lobster' ]
    ]
    // link: [ '$', 'recommended' ]
  },

  // non-user data
  discover: {
    title: 'Discovery',
    icon: 'discover',
    items: {
      carousel: {
        order: -1,
        items: {
          focus: 'lobster',
          0: [ '$', 'movies', 'items', 'lobster' ],
          1: [ '$', 'shows', 'items', 'got' ],
          2: [ '$', 'shows', 'items', 'lilyhammer' ]
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
  channels: {
    title: 'Channels',
    icon: 'channels',
    items: {
      0: {
        title: 'Abu Dhabi HD',
        epg: {
          0: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           1: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           2: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           3: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           4: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          }
        },
        img: {
          thumb: 'http://www.dubaichronicle.com/wp-content/uploads/2009/07/AD-HD-Logo.jpg',
          logo: 'https://s3.amazonaws.com/f.cl.ly/items/0b2W1U1K2E131t2i1E3t/ADSports4_Live_Thumb.png?v=b1ce2ee0'
        }
      },
      1: {
        title: 'Al Emarat HD',
        epg: {
          0: {
            title: 'Faker Bil Seha',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '18:30 - 19:00',
            time: 0.6
          },
           1: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           2: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           3: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           4: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          }
        },
        img: {
          thumb: 'http://en.kingofsat.net/jpg/alemarat-hd.jpg',
          logo: 'https://s3.amazonaws.com/f.cl.ly/items/0b2W1U1K2E131t2i1E3t/ADSports4_Live_Thumb.png?v=b1ce2ee0'
        }
      },
      2: {
        title: 'AD Sport 1 HD',
        epg: {
          0: {
            title: 'Iftah Ya Simsim',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '16:45 - 19:30',
            time: 0.4
          },
           1: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           2: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           3: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           4: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          }
        },
        img: {
          thumb: 'http://www.dubaichronicle.com/wp-content/uploads/2009/07/AD-HD-Logo.jpg',
          logo: 'https://s3.amazonaws.com/f.cl.ly/items/0b2W1U1K2E131t2i1E3t/ADSports4_Live_Thumb.png?v=b1ce2ee0'
        }
      },
      3: {
        title: 'AD Sport 2 HD',
        epg: {
          0: {
            title: 'Seret Hob',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:45 - 20:15',
            time: 0.7
          },
           1: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           2: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           3: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           4: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          }
        },
        img: {
          thumb: 'http://www.dubaichronicle.com/wp-content/uploads/2009/07/AD-HD-Logo.jpg',
          logo: 'https://s3.amazonaws.com/f.cl.ly/items/0b2W1U1K2E131t2i1E3t/ADSports4_Live_Thumb.png?v=b1ce2ee0'
        }
      },
      4: {
        title: 'Majid Kids TV',
        epg: {
          0: {
            title: 'Majid Bil Seha',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '18:30 - 19:00',
            time: 0.8
          },
           1: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           2: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           3: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          },
           4: {
            title: 'Ekatarina',
            description: 'Ekaterina is a Russian production, which will have a total of 12 episodes lasting 44 minutes each. Ekaterina promises to be a rollercoaster of emotions, featuring incredible turns and twists to a historical feature, without leaving behind the authentic story of Catherine The Great.',
            subtitle: '17:30 - 21:30',
            time: 0.3
          }
        },
        img: {
          thumb: 'http://en.kingofsat.net/jpg/adkids-hd.jpg',
          logo: 'https://s3.amazonaws.com/f.cl.ly/items/0b2W1U1K2E131t2i1E3t/ADSports4_Live_Thumb.png?v=b1ce2ee0'
        }
      }
    }
  },
  movies: {
    title: 'Movies',
    icon: 'film',
    items: {
      lobster: {
        title: 'The Lobster',
        subtitle: '(2009) 201 min',
        description: descriptions.got,
        img: {
          val: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg',  // 2:1
          thumb: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg', // 4:3
          poster: 'http://i.ebayimg.com/images/g/6wsAAOSw~bFWMFCS/s-l300.jpg' // 2:3
        },
        video: {},
        time: 0.3,
        duration: 201 * 60 * 1e3
      },
      sw: {
        title: 'Star Wars: The Force Awakens',
        subtitle: '(2009) 201 min',
        time: 0.5, // default s 0
        img: {
          val: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg',  // 2:1
          thumb: 'http://images.techtimes.com/data/images/full/154411/star-wars-the-force-awakens-theatrical-poster.jpg', // 4:3
          poster: 'http://www.cinemark.com/media/47129355/big.jpg' // 2:3
        },
        video: {},
        time: 0.3,
        duration: 201 * 60 * 1e3
      },
      joy: {
        title: 'Joy',
        subtitle: '(2009) 201 min',
        img: {
          thumb: 'http://img2-2.timeinc.net/people/i/2016/news/160104/jennifer-lawrence-800.jpg',
          poster: 'http://www.eonline.com/eol_images/Entire_Site/2015717/rs_634x939-150817124543-634-joy-jennifer-lawrence-Onesheet.jpg'
        },
        video: {},
        time: 0.3,
        duration: 201 * 60 * 1e3
      },
      h8: {
        title: 'The Hateful Eight',
        subtitle: '(2016) 201 min',
        time: 0.5, // default s 0
        img: {
          val: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg',  // 2:1
          thumb: 'http://nick-intl.mtvnimages.com/uri/mgid:file:gsp:scenic:/international/mtvatthemovies.com/images/400x300/The-Hateful-Eight-400x300.jpg?height=300&width=400&matte=true&quality=0.91', // 4:3
          poster: 'https://upload.wikimedia.org/wikipedia/en/d/d4/The_Hateful_Eight.jpg' // 2:3
        },
        video: {},
        time: 0.3,
        duration: 201 * 60 * 1e3
      },
      zoolander: {
        title: 'Zoolander 2',
        subtitle: '(2016) 148 min',
        time: 0.5,
        img: {
          thumb: 'http://www.cinealerta.com.br/wp-content/uploads/2010/11/Zoolander-2-Movie-Poster-400x300.jpg',
          poster: 'http://www.hollywoodreporter.com/sites/default/files/imagecache/thumbnail_medium_200/2015/11/zoolander_2_poster_by_eyrichdesign-d8hrbw9.jpg'
        },
        video: {},
        time: 0.3,
        duration: 201 * 60 * 1e3
      }
    }
  },
  shows: {
    title: 'Shows',
    icon: 'shows',
    items: {
      0: {
        title: 'Game of Thrones',
        subtitle: '2 Seasons - 12 Episodes',
        description: descriptions.got,
        time: 0.5,
        img: {
          val: 'http://static1.squarespace.com/static/528b0a4be4b0d32bd54a0862/t/53a7386be4b04854556bc822/1403467898455/Game-of-Thrones-poster.jpg',
          thumb: 'http://static4.businessinsider.com/image/4f74d5f569bedd863a000012/stark-family-game-of-thrones.jpg',
          poster: 'http://ecx.images-amazon.com/images/I/41BFwCXK2vL._SY300_.jpg' // 2:3
        },
        currentSeason: ['$', 'shows', 'items', 'got', 'seasons', '1'],
        currentEpisode: ['got', 'seasons', '1', 'episodes', '1'],
        items: {
          seasons: {
            0: {
              title: 'Season 1',
              episodes: {
                items: {
                  1: {
                    title: 'Winter is comming',
                    description: 'Winter is commingWinter is commingWinter is commingWinter is commingWinter is commingWinter is commingWinter is comming',
                    img: {
                      val: 'http://static1.squarespace.com/static/528b0a4be4b0d32bd54a0862/t/53a7386be4b04854556bc822/1403467898455/Game-of-Thrones-poster.jpg',
                      thumb: 'http://static4.businessinsider.com/image/4f74d5f569bedd863a000012/stark-family-game-of-thrones.jpg',
                      poster: 'http://ecx.images-amazon.com/images/I/41BFwCXK2vL._SY300_.jpg' // 2:3
                    }
                  }
                }
              }
            },
            1: {
              title: 'Season 1',
              items: {
                1: {
                  title: 'Winter is comming',
                  subtitle: '15 min',
                  description: 'Winter is commingWinter is commingWinter is commingWinter is commingWinter is commingWinter is commingWinter is comming',
                  video: {},
                  time: 0.3,
                  duration: 201 * 60 * 1e3
                }
              }
            }
          }
        }
      },
      1: {
        title: 'Lilyhammer',
        description: descriptions.got,
        subtitle: '2 Seasons - 12 Episodes',
        time: 0.5,
        img: {
          val: 'http://static1.squarespace.com/static/528b0a4be4b0d32bd54a0862/t/53a7386be4b04854556bc822/1403467898455/Game-of-Thrones-poster.jpg',
          thumb: 'http://www.spin1038.com/content/000/images/000031/33064_54_news_hub_28045_630x480.jpg',
          poster: 'http://img.movieberry.com//static/photos/148166/poster-200x300.jpg' // 2:3
        }
      },
      2: {
        title: 'Sopranos',
        subtitle: '8 Seasons - 72 Episodes',
        description: descriptions.got,
        time: 0.5,
        img: {
          val: 'http://static1.squarespace.com/static/528b0a4be4b0d32bd54a0862/t/53a7386be4b04854556bc822/1403467898455/Game-of-Thrones-poster.jpg',
          thumb: 'data:image/jpeg;base64,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',
          poster: 'http://ecx.images-amazon.com/images/I/41vqBRr32IL._SY300_.jpg' // 2:3
        }
      },
      3: {
        title: 'Modern Family',
        subtitle: '8 Seasons - 72 Episodes',
        description: descriptions.got,
        time: 0.5,
        img: {
          val: 'http://static1.squarespace.com/static/528b0a4be4b0d32bd54a0862/t/53a7386be4b04854556bc822/1403467898455/Game-of-Thrones-poster.jpg',
          thumb: 'http://the-toast.net/wp-content/uploads/2015/05/Modern-Familytigtlecard.jpg',
          poster: 'http://beeimg.com/images/w02612240622.jpg' // 2:3
        }
      }
    }
  },
  publishers: {
    title: 'Publishers',
    icon: 'publishers',
    items: {
      lynx: {
        title: 'Dubai Lynx',
      }
    }
    //   lynx: {
    //     title: 'Sopranos',
    //     subtitle: '8 Seasons - 72 Episodes',
    //     time: 0.5,
    //     img: {
    //       val: 'http://static1.squarespace.com/static/528b0a4be4b0d32bd54a0862/t/53a7386be4b04854556bc822/1403467898455/Game-of-Thrones-poster.jpg',
    //       thumb: 'data:image/jpeg;base64,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',
    //       poster: 'http://ecx.images-amazon.com/images/I/41vqBRr32IL._SY300_.jpg' // 2:3
    //     }
    //   },
    //   other: {
    //     title: 'Modern Family',
    //     subtitle: '8 Seasons - 72 Episodes',
    //     time: 0.5,
    //     img: {
    //       val: 'http://static1.squarespace.com/static/528b0a4be4b0d32bd54a0862/t/53a7386be4b04854556bc822/1403467898455/Game-of-Thrones-poster.jpg',
    //       thumb: 'http://the-toast.net/wp-content/uploads/2015/05/Modern-Familytigtlecard.jpg',
    //       poster: 'http://beeimg.com/images/w02612240622.jpg' // 2:3
    //     }
    //   }
    // }
  }
}
