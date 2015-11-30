'use strict'

var axios = require('axios')
var Promise = require('bluebird')
var XFluent = require('xfluent')

exports.ad = {
  properties: {
    vastOptions: true
  },
  vastUrl: {
    $type: 'url'
  }
}

exports.on = {
  render: {
    vastAdRender () {
      let player = this
      axios.get(this.ad.vastUrl.val, { responseType: 'document' })
        .then(getMediaObjects.bind(this))
        .then((mediaObj) => {
          player.set({
            ad: {
              src: mediaObj.videoUrl,
              clickSrc: mediaObj.clickUrl
            }
          })
        })
    }
  }
}

function getMediaObjects (res) {
  var fluent = new XFluent(res.data)
  var videoUrl = ''
  var videoClickThrough = ''

  return new Promise((resolve) => {
    fluent
      .get('Linear')
      .get('MediaFile')
      .filterByAttribute('type', 'bitrate', (type, bitrate) => {
        var options = this.ad.vastOptions
        bitrate = Number(bitrate)
        return (options.supportedMediaTypes.indexOf(type) !== -1 &&
          (bitrate >= options.mediaBitrateMim && bitrate <= options.mediaBitrateMax))
      })
      .each((el) => {
        videoUrl = el.childNodes[0].nodeValue
      })
      .up()
      .get('ClickThrough')
      .each((el) => {
        videoClickThrough = el.childNodes[0].nodeValue
      })
      .end()

    resolve({ videoUrl: videoUrl, clickUrl: videoClickThrough })
  })
}

// Preroll
// function h5vPreRoll(video_player_id, obj_vast, options){
//   var video_player = document.getElementById(video_player_id);
//
//
//   //Video play event
//   var prev_src = h5vGetCurrentSrc(video_player_id);
//   var video_player_play = function(event) {
//
//       //Change source to PreRoll
//       video_player.src = obj_vast.media_file;
//       video_player.load();
//
//       //On content load
//       var video_player_loaded = function(event){
//         h5vAddClickthrough(video_player_id,obj_vast);
//         h5vAddCaption(video_player_id,options.ad_caption);
//
//         video_player.play();
//
//         //Fire impression(s)
//         if(obj_vast.impression!=null){
//
//           for(var k=0;k<obj_vast.impression.length;k++){
//             h5vAddPixel(obj_vast.impression[k].childNodes[0].nodeValue);
//           }
//         }
//         video_player.removeEventListener('loadedmetadata',video_player_loaded);
//       }
//
//       //On PreRoll End
//       var video_player_ended = function(event){
//         video_player.src = prev_src;
//         video_player.load();
//         video_player.play();
//         h5vRemoveClickthrough(video_player_id);
//         h5vRemoveCaption(video_player_id);
//         video_player.removeEventListener('ended',video_player_ended);
//
//       }
//
//       video_player.addEventListener('loadedmetadata', video_player_loaded);
//       video_player.addEventListener('ended', video_player_ended);
//       video_player.removeEventListener('play', video_player_play);
//   }
// }
