var Element = require('../../../lib/element')

describe("insertBefore in elem", function () {
  var elem = new Element({
    child: {}
  })

  it('insertBefore child works', function () {
    elem.set({
      thingBeforeChild: {
        insertBefore: 'child',
        node: 'span'
      }
    })
    var childNodes = elem.node.childNodes
    // console.log(childNodes.splice())
    expect([].indexOf.call(childNodes,elem.thingBeforeChild.node) < [].indexOf.call(childNodes,elem.child.node)).ok
  })
})
