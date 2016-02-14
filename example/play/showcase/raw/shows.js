module.exports = {
  title: 'Shows',
  icon: 'shows',
  items: {
    0: {
      title: 'Game of Thrones',
      subtitle: '2 Seasons - 12 Episodes',
      description: 'Description of this Show.',
      time: 0.5,
      img: {
        thumb: 'http://share.vigour.io/2G2G003J3A39/thumb.png',
        spotlight: 'http://share.vigour.io/152i2U0C1J3B/spotlight.png',
        poster: 'http://share.vigour.io/401H2C3e2b24/poster.png'
      },
      currentSeason: ['$', 'shows', 'items', '0', 'seasons', '0'],
      currentEpisode: ['$', 'shows', 'items', '0', 'seasons', '0', 'items', '0'],
      seasons: {
        0: {
          title: 'Season 1',
          description: 'Description of this Season.',
          items: {
            0: {
              title: 'Episode Title',
              description: 'Description of this Episode',
              img: {
                thumb: 'http://share.vigour.io/2G2G003J3A39/thumb.png',
                spotlight: 'http://share.vigour.io/152i2U0C1J3B/spotlight.png',
                poster: 'http://share.vigour.io/401H2C3e2b24/poster.png'
              },
              video: '/api/mena-web/asset/3787/play'
            },
            1: {
              title: 'Episode Title',
              description: 'Description of this Episode',
              img: {
                thumb: 'http://share.vigour.io/2G2G003J3A39/thumb.png',
                spotlight: 'http://share.vigour.io/152i2U0C1J3B/spotlight.png',
                poster: 'http://share.vigour.io/401H2C3e2b24/poster.png'
              },
              video: '/api/mena-web/asset/3787/play'
            }
          }
        },
        1: {
          title: 'Season 2',
          description: 'Description of this Season.',
          items: {
            0: {
              title: 'Episode Title',
              description: 'Description of this Episode',
              img: {
                thumb: 'http://share.vigour.io/2G2G003J3A39/thumb.png',
                spotlight: 'http://share.vigour.io/152i2U0C1J3B/spotlight.png',
                poster: 'http://share.vigour.io/401H2C3e2b24/poster.png'
              },
              video: '/api/mena-web/asset/3787/play'
            },
            1: {
              title: 'Episode Title',
              description: 'Description of this Episode',
              img: {
                thumb: 'http://share.vigour.io/2G2G003J3A39/thumb.png',
                spotlight: 'http://share.vigour.io/152i2U0C1J3B/spotlight.png',
                poster: 'http://share.vigour.io/401H2C3e2b24/poster.png'
              },
              video: '/api/mena-web/asset/3787/play'
            }
          }
        }
      }
    }
  }
}
