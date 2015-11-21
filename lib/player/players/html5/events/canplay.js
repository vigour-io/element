exports.inject = [
  require('../../../../../lib/events/render')
]

exports.on = {
  render: {
    handleCanPlay () {
      let node = this.node
      node.oncanplay = onCanPlay.bind(this)
    }
  }
}

function onCanPlay () {
  this.emit('canplay', this)
}
