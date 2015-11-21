// require('../libs/bitdash.min.js')
require('../libs/bitdash.min.js')

// require('../libs/bitdashplayer.min.js')
// require('../libs/bitdashplayer.min.css')
//require('../libs/bitdashplayer.swf')

var defaults = {
  key: "9e8218951b91f51b0c0f3f181add41b2",
  source:    {
    mpd: "https://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2038_d06f9f4f032f9f599edbe38f1acd2900/5391_93fe74e97ef2a8ff3389d5a490d902c7/5391.mpd",
    hls: 'https://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2038_d06f9f4f032f9f599edbe38f1acd2900/5391_93fe74e97ef2a8ff3389d5a490d902c7/5391.m3u8',
  },
  playback: {
    autoplay: true
  }
}

module.exports = exports = function init(id, conf) {
  if(!conf) {
    conf = defaults
  }
  bitdash("player").setup(conf)
}
