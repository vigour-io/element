'use strict'
console.log('--- require player')
var Player = require('../../../lib/player')
var Element = require('../../../lib/element')

var app = require('../../../lib/app')

console.log('--- inject things')
Player.prototype.set({
  inject: require('vigour-element/lib/player/bitdash'),
  options: {
    bitdashScriptUrl: 'https://bitmovin-a.akamaihd.net/bitdash/beta/latest/bitdash.min.js',
    key: '225bef4e-5b4d-4444-94b1-4f2fd499fd3b',
    advertising: {
      client: 'vast',
      schedule: {
        'pre-roll-ad-01': {
          offset: 'pre',
          tag: 'http://ads.adhese.be/ad3ad/sl_vier.be_hetbestemoetnogkomen_-preroll/rn5707/pr1/re0068007400740070003a002f002f003100390032002e003100360038002e0031002e00320037003a0038003000380036002f003f002400690064003d006d00610063002d006400650073006b0074006f0070002d006300680072006f006d0065002d0038003800300026002400660069006c0065003d002f006500780061006d0070006c0065002f006100640073002f00620061006e006e006500720073002f006100640068006500730065002e006a0073002600240061006300740069006f006e003d006400650076/ur0068007400740070003a002f002f003100390032002e003100360038002e0031002e00320037003a0038003000380036002f003f002400690064003d006d00610063002d006400650073006b0074006f0070002d006300680072006f006d0065002d0038003800300026002400660069006c0065003d002f006500780061006d0070006c0065002f006100640073002f00620061006e006e006500720073002f006100640068006500730065002e006a0073002600240061006300740069006f006e003d006400650076/brChrome;Chrome47;OSX;desktop/dtdesktop/inrbcn;prx/?t=1452871150165',
        }
      }
    }
  }
})

var thePlayer = new Player({
  // play: true,
  src: {
    dash: 'https://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2038_d06f9f4f032f9f599edbe38f1acd2900/5391_93fe74e97ef2a8ff3389d5a490d902c7/5391.mpd',
    hls: 'https://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2038_d06f9f4f032f9f599edbe38f1acd2900/5391_93fe74e97ef2a8ff3389d5a490d902c7/5391.m3u8',
      // hls: 'http://abudhabimedia-lh.akamaihd.net/i/ch_adaloulahd@325615/master.m3u8'
    on: {
      render (node, event) {
        console.log('haha')
      }
    }
  }
})

app.set({
  player: thePlayer,
  progress: {
    inject: require('../../../lib/event/drag'),
    on: {
      down (e) {
        seek.call(this, e)
        },
        drag (e) {
          seek.call(this, e)
        }
    },
    seek: {
      bar: {
        w: {
          $: 'time',
          $transform(val) {
            return val * 100 + '%'
          }
        },
        button: {}
      }
    }
  }
})
