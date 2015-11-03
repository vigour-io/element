describe('Removing children', function () {
  var app = require('../../../../lib/app')
  var Element = require('../../../../lib/element')

  var elem = new Element({
    elemChild: {},
    elemChild2: {}
  })

  app.set({
    elem: new elem.Constructor({
      key: 'a'
    }),
    elemInstance: new elem.Constructor({
      key: 'b',
      elemInstanceChild: {}
    })
  })

  describe('Removing child from original', function () {
    it('elem.elemChild.remove()', function () {
      elem.elemChild.remove()
    })

    it('app.elem.elemChild is removed', function () {
      // this test is wrong
      expect(app.elem.elemChild).to.not.be.ok
    })

    it('app.elemInstance.elemChild is also removed', function () {
      expect(app.elemInstance.elemChild).to.not.be.ok
    })
    //
    // //TODO: this test is good, we need to fix remove for nodes, and uncomment the test
    it('app.elem.elemChild and app.elemInstance.elemChild nodes are removed', function () {
      expect(document.getElementsByClassName('elemChild').length).to.not.be.ok
    })
  })
  //
  // remove child from instance
  describe('Remove child from instance', function () {
    it('app.elemInstance.elemChild2.remove()', function () {
      app.elemInstance.elemChild2.remove()
    })

    it('app.elemInstance.elemChild2 is removed', function () {
      expect(app.elemInstance.elemChild2).to.be.null
    })

    it('app.elem.elemChild2 is not removed', function () {
      // nu deze nog!
      expect(app.elem.elemChild2).to.be.ok
    })

    // TODO: this test is good, we need to fix remove for nodes, and uncomment the test
    it('only app.elemInstance.elemChild2 node is removed', function () {
      expect(document.getElementsByClassName('elemChild2').length).to.not.be.one
    })

  })

  describe('Removing original', function () {
    it('elem.remove()', function () {
      elem.remove()
    })

    it('app.elem is removed', function () {
      expect(app.elem).to.not.be.ok
    })

    it('app.elemInstance is removed', function () {
      expect(app.elemInstance).to.not.be.ok
    })

    // TODO: this test is good, we need to fix remove for nodes, and uncomment the test
    it('app.elem.elemChild and app.elemInstance.elemChild nodes are removed', function () {
      expect(document.getElementsByClassName('elemChild').length).to.not.be.ok
    })

  })

})
