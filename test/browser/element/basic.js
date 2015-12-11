describe('Vigour Element', () => {

  //Arrange (setup, requiring dependencies and stuff)
  var Element = require('../../../lib/element/')
  var elem


  describe('Element Instances',() => {
    beforeEach(() => {
      //act (Doing,triggering,firing what you want to test, System under test or unit that you want to test)
      elem = new Element()
    })
    context('When instantiating a new element', () => {

      it('elem should be a instance of Element', () => {
        //assert (expactation that you want to check after the action)
        expect(elem).to.be.instanceOf(Element)
      })

      it('elem should have no key by default', () => {
        expect(elem.key).to.equal(void 0)
      })

      it('elem should have no path', () => {
        expect(elem.path.length).to.equal(0)
      })

      it('elem should have no context', () => {
        expect(elem._context).to.not.be.ok
      })
    })

    context('When setting a key on the element', () => {
      beforeEach(()=>{
        //act (Doing,triggering,firing what you want to test, System under test or unit that you want to test)
        elem.set({key: 'a'})
      })

      it('elem should have the key "a"', ()=>{
        expect(elem.key).to.equal('a')
      })

      it("elem should have a path ['a']", function () {
        expect(elem.path).to.deep.equal(['a'])
      })

      it('elem should still has no context', function () {
        expect(elem._context).to.not.be.ok
      })

    })
     context('When adding child element', () => {
      beforeEach(()=>{
        //act (Doing,triggering,firing what you want to test, System under test or unit that you want to test)
        elem.set({key: 'a'})
        elem.set({ elemChild: {} })
      })

      it('elem.child should be an instance of Element', () => {
        expect(elem.elemChild instanceof Element).to.equal(true)
      })

      it('elem.child should have a key "elemChild"', ()=>{
         expect(elem.elemChild.key).to.equal('elemChild')
      })

      it('elem.elemChild sohuld have path ["a","elemChild"]', () => {
        expect(elem.elemChild.path).to.deep.equal(['a', 'elemChild'])
      })

      it('elem.elemChild should have no context', function () {
        expect(elem.elemChild._context).to.not.be.ok
      })
    })
  })
})
