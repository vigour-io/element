'use strict'
var Observable = require('vigour-js/lib/observable')
var Data = new Observable({
  inject: require('../../lib/subscription/stamp'),
  Child: 'Constructor'
}).Constructor

var str = `Out too the been like hard off. Improve enquire welcome own beloved matters her. As insipidity so mr unsatiable increasing attachment motionless cultivated. Addition mr husbands unpacked occasion he oh. Is unsatiable if projecting boisterous insensible. It recommend be resolving pretended middleton.

By an outlived insisted procured improved am. Paid hill fine ten now love even leaf. Supplied feelings mr of dissuade recurred no it offering honoured. Am of of in collecting devonshire favourable excellence. Her sixteen end ashamed cottage yet reached get hearing invited. Resources ourselves sweetness ye do no perfectly. Warmly warmth six one any wisdom. Family giving is pulled beauty chatty highly no. Blessing appetite domestic did mrs judgment rendered entirely. Highly indeed had garden not.

No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do az`

module.exports = new Data({
  shows: {
    a: {
      title: 'a',
      description: str,
      img: 'http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg'
    },
    b: {
      title: 'b',
      description: str,
      img: 'http://www.planwallpaper.com/static/images/canberra_hero_image_JiMVvYU.jpg'
    }
  },
  videos: {
    a: {
      title: 'episode a',
      description: str,
      time: 0.5,
      img: 'http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg'
    },
    b: {
      title: 'episode b',
      time: 0.1,
      description: str,
      img: 'http://www.planwallpaper.com/static/images/canberra_hero_image_JiMVvYU.jpg'
    }
  },
  channels: {
    a: {
      title: 'channel a',
      description: str,
      time: 0.1,
      img: 'http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg'
    },
    b: {
      title: 'channel b',
      time: 0.2222,
      description: str,
      img: 'http://www.planwallpaper.com/static/images/canberra_hero_image_JiMVvYU.jpg'
    }
  },
  discover: {
    new: {
      items: {
        a: { title: 'nest-a' } // make ref -- support this traight in vjs
      }
    }
  }
})

