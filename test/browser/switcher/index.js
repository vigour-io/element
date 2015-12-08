
var Element = require('../../../lib/element')
var Property = require('../../../lib/property')
var Switcher = require('../../../lib/switcher')
var switcher
var spy
var spyAnimation
var secondContainer
var firstContainer
Property.prototype.inject(
  require('../../../lib/animation')
)

Element.prototype.inject(
  require('../../../lib/property/css'),
  require('../../../lib/property/transform'),
  require('../../../lib/property/opacity'),
  require('../../../lib/property/text'),
  require('../../../lib/property/transition'),
  require('../../../lib/property/css'),
  require('../../../lib/property/draggable'),
  require('../../../lib/property/size'),
  require('../../../lib/events/drag'),
  require('../../../lib/animation')
)

describe('--> Switcher' , () => {
  switcher = new Switcher

  firstContainer = new Element({
    key:1,
    x:{
      val:0,
      $animation: {

      }
    },
    y:{
      val:0,
      $animation: {

      }
    }
  })

  secondContainer = new Element({
    key:2,
    x:{
      val:0,
      $animation: {

      }
    },
    y:{
      val:0,
      $animation: {

      }
    }
  })

  switcher.emit('add',[null,{'1': firstContainer}])

  describe('--> Emiting the switchto animation' , () => {

    it('emiting switchto event', () => {
      spy = sinon.spy(switcher._on.switchto.fn, 'animate')
      switcher.emit('switchto',[firstContainer, secondContainer,'left', 50])
      expect(spy.calledOnce).to.be.ok
    })

    it('should add the second container on the receiver', () => {
      expect(switcher.node.children.length).to.be.equals(2)
    })
    it('should insert the second container before the firstContainer', () =>{
      expect(switcher.node.children[0].base.key).to.be.equals('2')
    })
    it('should have the transation end event', () => {
      spyAnimation = sinon.spy(firstContainer._on.transitionEnd.fn, 'val')
      expect(spyAnimation).to.be.ok
    })
    it('should use the passed duration time', () => {
      expect(firstContainer.x.$animation.duration.val).to.be.equals(50)
    })
  })

  describe('Emiting the togetherto animation',() => {
    beforeEach(() => {
      switcher = new Switcher
      switcher.emit('add',[null,{'1': firstContainer}])
    })
    it('emiting togetherto event', () => {
      spy = sinon.spy(switcher._on.togetherto.fn, 'together')
      switcher.emit('togetherto',[firstContainer, secondContainer,'left', 80])
      expect(spy.calledOnce).to.be.ok
    })
    it('should not insert before ', () => {
      switcher.emit('togetherto',[firstContainer, secondContainer,'left', 80])
      expect(switcher.node.children[0].base.key).to.be.equals("1")
    })

    it('firstContainer animation should ends after the secondContainer animation ', () => {
      switcher.emit('togetherto',[firstContainer, secondContainer,'left', 80])
      spyAnimation = sinon.spy(firstContainer._on.transitionEnd.fn, 'val')
      expect(sinon.assert.notCalled(spyAnimation))
      expect(sinon.assert.called(spy))
    })
    it('should use the passed duration time', () => {
      expect(firstContainer.x.$animation.duration.val).to.be.equals(80)
    })

    it('should use the passed duration time for the second container / 1.5. --  80/1.5 = 53.333333333333336', () => {
      expect(secondContainer.x.$animation.duration.val).to.be.equals(53.333333333333336)
    })
  })

  describe('Emiting the changeto animation', () => {
    beforeEach(() => {
      switcher = new Switcher
      switcher.emit('add',[null,{'1': firstContainer}])
    })


    it.skip('should use duration 0', () => {
      // spy = sinon.spy(switcher._on.changeto.fn, 'change')
      // switcher.emit('changeto',[firstContainer, secondContainer,'left', 80])
      // debugger
      // expect(firstContainer.node.style.webkitTransitionDuration).to.be.equals(0)
    })
  })
})
