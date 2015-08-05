exports.fireEvent = function(element,type){
  var event; // The custom event that will be created

  if (document.createEvent) {
    event = document.createEvent("HTMLEvents");
    event.initEvent(type, true, true);
  } else {
    event = document.createEventObject();
    event.eventType = type;
  }

  event.eventName = type;

  if (document.createEvent) {
    element.dispatchEvent(event);
  } else {
    element.fireEvent("on" + event.eventType, event);
  }
}