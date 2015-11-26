module.exports = {
  left:{
    "37":"defaultLeft",
    "4":"samsungLeft"
  },
  right:{
    "39":"defaultRight",
    "5":"samsungRight"
  },
  up:{
    "38":"defaultUp",
    "29460":"samsungUp"
  },
  down:{
    "40":"defaultDown",
    "29461":"samsungDown"
  },
  findElement (originElement, direction) {
    var elementDirection = direction+'Sibling'
    if (originElement.node[elementDirection] === null) {
      return
    }
    if(this.isSelectable(originElement.node[elementDirection].type)
      && originElement.node[elementDirection].style.display != 'none') {
      originElement.node[elementDirection].focus()
    }
  },
  isSelectable (element) {
    var selectable = {
      "button":true,
      "textarea":true,
      "input":true
    }
    return selectable[element] ? true : false
  }
}


// We could have something like this.. Check with youzi!
// var yo = new Element({
//   selectable: false
// })
