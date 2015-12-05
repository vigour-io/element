

exports = direction = {
  'left' : (current, container, durationTime, together) => {
    if(together){
      //bug
      current.x.remove()
      current.set({x:{val:container.width.val,$animation :{duration:''}}})

      current.setKey('x', current.x.val - container.width.val)
    }else {
      current.setKey('x', current.x.val - container.width.val)
    }

    current.x.$animation.set({
      duration : durationTime
    })
  },
  'right' : (current, container, durationTime, together)  =>  {
    if(together){
      //bug
      current.x.remove()
      current.set({x:{val:container.width.val - container.width.val * 2,$animation :{duration:''}}})

      current.setKey('x', current.x.val + container.width.val)
    }else {
      current.setKey('x', current.x.val + container.width.val)
    }
    current.x.$animation.set({
      duration : durationTime
    })
  },
  'up' : (current, container, durationTime)  =>  {
    current.setKey('y', current.y.val - container.height.val)
    current.y.$animation.set({
      duration : durationTime
    })
  },
  'down' : (current, container, durationTime) =>  {
    current.setKey('y', current.y.val + container.height.val)
    current.y.$animation.set({
      duration : durationTime
    })
  }
}
