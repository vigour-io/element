

exports = direction = {
  'left' : (current, container, durationTime) => {
    current.setKey('x', current.x.val - container.width.val)
    current.x.$animation.set({
      duration : durationTime
    })
    console.log(current.x.$animation.duration.val)
  },
  'right' : (current, container, durationTime)  =>  {
    current.setKey('x', current.x.val + container.width.val)
    current.x.$animation.set({
      duration : durationTime
    })
    console.log(current.x.$animation.duration.val)
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
