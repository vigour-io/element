// [TODO - move this to Gaston]
exports.fireEvent = function (element, type) {
  var event // The custom event that will be created
  if (document.createEvent) {
    event = document.createEvent('HTMLEvents')
    event.initEvent(type, true, true)
  } else {
    event = document.createEventObject()
    event.eventType = type
  }

  event.eventName = type
  event.changedTouches = event.changedTouches || [{
    pageX: 0,
    pageY: 0
  }]

  if (document.createEvent) {
    element.dispatchEvent(event)
  } else {
    element.fireEvent('on' + event.eventType, event)
  }
}

exports.checkIfInDocumentBody = function (node) {
  var parentNode = node.parentNode
  while (parentNode) {
    if (parentNode === document.body) {
      return true
    }
    parentNode = parentNode.parentNode
  }
}
