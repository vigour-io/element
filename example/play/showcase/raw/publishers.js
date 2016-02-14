module.exports = {
	title: 'Publishers',
	icon: 'publishers',
	items: {
		focus: 0,
    length: 2,
	  0: {
	    title: 'Dubai Lynx',
	    description: 'Description of the Publisher',
	    img: {
        thumb: 'http://share.vigour.io/2G2G003J3A39/thumb.png',
        spotlight: 'http://share.vigour.io/152i2U0C1J3B/spotlight.png',
        poster: 'http://share.vigour.io/401H2C3e2b24/poster.png'
      },
      items: {
      	focus: 0,
      	length: 3,
	      0: {
	        title: 'Feautured on Dubai Lynx',
	        link: [ '$', 'channels' ], // order is irrelevant now
	        items: [
	          [ '$', 'channels', 'items', '0' ],
	          [ '$', 'channels', 'items', '1' ],
	          [ '$', 'channels', 'items', '2' ],
	          [ '$', 'channels', 'items', '3' ],
	          [ '$', 'channels', 'items', '4' ]
	        ]
	      },
	      1: {
	        title: 'Lynx Drama',
	        link: [ '$', 'channels' ], // order is irrelevant now
	        items: [
	          [ '$', 'channels', 'items', '0' ],
	          [ '$', 'channels', 'items', '1' ],
	          [ '$', 'channels', 'items', '2' ],
	          [ '$', 'channels', 'items', '3' ],
	          [ '$', 'channels', 'items', '4' ]
	        ]
	      },
	      2: {
	        title: 'Lynx Movies',
	        link: [ '$', 'channels' ], // order is irrelevant now
	        items: [
	          [ '$', 'channels', 'items', '0' ],
	          [ '$', 'channels', 'items', '1' ],
	          [ '$', 'channels', 'items', '2' ],
	          [ '$', 'channels', 'items', '3' ],
	          [ '$', 'channels', 'items', '4' ]
	        ]
	      }
    	}
	  },
	  1: {
	    title: 'The Toolshop',
	    description: 'Description of the Publisher',
	    img: {
        thumb: 'http://share.vigour.io/2G2G003J3A39/thumb.png',
        spotlight: 'http://share.vigour.io/152i2U0C1J3B/spotlight.png',
        poster: 'http://share.vigour.io/401H2C3e2b24/poster.png'
      },
      items: {
      	focus: 0,
      	length: 3,
	      0: {
	        title: 'Feautured on The Toolshop',
	        link: [ '$', 'channels' ], // order is irrelevant now
	        items: [
	          [ '$', 'channels', 'items', '0' ],
	          [ '$', 'channels', 'items', '1' ],
	          [ '$', 'channels', 'items', '2' ],
	          [ '$', 'channels', 'items', '3' ],
	          [ '$', 'channels', 'items', '4' ]
	        ]
	      },
	      1: {
	        title: 'Latest Videos',
	        link: [ '$', 'channels' ], // order is irrelevant now
	        items: [
	          [ '$', 'channels', 'items', '0' ],
	          [ '$', 'channels', 'items', '1' ],
	          [ '$', 'channels', 'items', '2' ],
	          [ '$', 'channels', 'items', '3' ],
	          [ '$', 'channels', 'items', '4' ]
	        ]
	      },
	      2: {
	        title: 'Building a Metal Lathe',
	        link: [ '$', 'channels' ], // order is irrelevant now
	        items: [
	          [ '$', 'channels', 'items', '0' ],
	          [ '$', 'channels', 'items', '1' ],
	          [ '$', 'channels', 'items', '2' ],
	          [ '$', 'channels', 'items', '3' ],
	          [ '$', 'channels', 'items', '4' ]
	        ]
	      }
    	}
	  }
	}
}
