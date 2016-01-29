'use strict'
var Element = require('../')
var Prop = require('../../property')
// ** this is now the dirtiest file in the stack can be way way way cleaner **
exports.define = {
  renderData (target, oldVal, event, old$, map, puremap) {
    var element = this
    if (!map) {
      if (puremap) {
        map = this.$map(void 0, void 0, puremap)
      } else {
        map = this.$map()
      }
    }
    walk(map, element, target, void 0, event)
    function walk (obj, element, target, rerenderinherit, event) {
      if (!target) {
        return
      }
      if (obj.$context) {
        for (let i in obj) {
          if (element[i] && element[i] instanceof Prop) {
            element.$subscribeProperty(element[i], target)
            if (rerenderinherit) {
              let nodex = element.getNode()
              if (nodex) {
                element[i].render(nodex, event, element)
              }
            }
          } else {
            if (element[i]) {
              walk(obj[i], element[i], target, rerenderinherit, event)
            }
          }
        }
      } else {
        if (!element) {
          console.error('no element in walk should never happen')
          return
        }


        if (element._context) {
          element = element.resolveContext({}, event, element._context) // moet nog met false
        }

        // NEEDS CLEAN
        // clean this up
        // if (element.listensOnAttach && element._input !== target) {
        //   element.listensOnAttach.each(function (p, i) {
        //     var keep
        //     for (var j in p.attach) {
        //       if (p.attach[j] && p.attach[j][1] === element) {
        //         // if (p.attach[j][0] === thisone) {
        //         //   keep = true
        //         // }
        //       }
        //     }
        //     // have to handle collection as well!
        //     if (!keep) {
        //       element.listensOnAttach[i].off('attach', j)
        //     }
        //   })
        // }
        // NEEDS CLEAN
        if (obj.$) {
          if (obj.$collection) {
            target.subscribe(obj.$, 'property', [
              function (data, event) {
                var origin = this.origin
                if (origin._input === null) {
                  element.each(function (p) {
                    p instanceof Element && p.remove(event)
                  })
                } else {
                  if (element._input !== origin) {
                    element.each(function (p) {
                      p instanceof Element && p.remove(event)
                    })
                  } else if (data && (data.removed)) {
                    element._input = origin
                    if (data.removed) {
                      for (let n in data.removed) {
                        if (element[data.removed[n]]) {
                          element[data.removed[n]].remove(event)
                        }
                      }
                    }
                    // use this!!!!
                    // if (data.added) {
                    //   for (let n in data.added) {
                    //     if (origin[data.added[n]]) {
                    //       iterator(origin[data.added[n]], data.added[n])
                    //     }
                    //   }
                    // }
                  }
                  element._input = origin
                  // wat to heavy to do this as extra fun
                  element.each((p, k) => {
                    if (p instanceof Element && !origin[k]) {
                      element[k].remove(event)
                    }
                  })
                  origin.each(function iterator (property, key) {
                    if (!property) {
                      return
                    }
                    var elem = element[key]
                    var origin = property.origin
                    if (origin && ((!elem || elem._input !== origin) && origin._input !== null)) {
                      element.set({ [key]: origin }, event)
                      let prop = element[key]
                      if (!prop.$) {
                        if (prop instanceof Element) {
                          prop.renderData(origin, oldVal, event)
                        } else {
                          if (prop instanceof Prop) {
                            prop.set(property, false)
                          }
                        }
                      }
                    }
                  })
                }
              }, element
            ], element.uid, true, event)
          } else {
            let stamp = event.stamp
            target.subscribe(obj.$, 'data', [
              function thisone (data, event) {
                var origin = this.origin
                if (element._parent === null) {
                  console.error('element.walk   REMOVED ELEMENT TOTALLY WRONG', element, data)
                  return
                }
                var rerender
                if (element._input && this.origin !== element._input || (stamp === event.stamp && oldVal)) {
                  if (element.listensOnAttach) {
                    element.listensOnAttach.each(function (p, i) {
                      // this can become 1000x faster (also dont do for nested)
                      var keep
                      for (var j in p.attach) {
                        if (p.attach[j] && p.attach[j][1] === element) {
                          if (p.attach[j][0] === thisone) {
                            keep = true
                          }
                        }
                      }
                      if (!keep) {
                        // this may be wrong
                        element.listensOnAttach[i].off('attach', j)
                      }
                    })
                  }

                  // need sunscribe info now, need to know in which subscription we are here
                  console.log('GOT REF! need to handle subs if we dont want anon sessions all the time', this._input.syncPath, this.syncPath)
                  // this is ultra messed up... will be days of work to get this refactored -- but is super nessecary
                  // only on change is ok for now -- also need on walk ofc will break things -- e.g. starts on exotic refs
                  if (origin && origin._input !== null) {
                    rerender = element.getNode()
                  }
                }
                element._input = origin //eslint-disable-line
                if (!rerenderinherit && element.getNode()) {
                  rerender = element.getNode()
                }
                for (let i in obj) {
                  if (element[i] && element[i] instanceof Prop) {
                    element.$subscribeProperty(element[i], origin)
                    if (rerender || rerenderinherit) {
                      element[i].render(rerender || element.getNode(), event, element)
                    }
                  } else if (i !== '$') {
                    // also support paths... this has to go away asap --- 10x cleaner in the hub subscribe reuse that walker or somethign
                    if (!element[i]) {
                      console.log('WTF ULTRA BROKEN', i, element, element[i])
                    }
                    walk(obj[i], element[i], origin, rerender || rerenderinherit, event)
                  }
                }
              }, element
            ], element.uid, true, event)
          }
        } else {
          for (let i in obj) {
            if (i !== '$' && i !== '$collection') {
              if (element[i] && element[i] instanceof Prop) {
                element.$subscribeProperty(element[i], target)
                if (rerenderinherit) {
                  element[i].render(element.getNode(), event, element)
                }
              } else {
                walk(obj[i], element[i], target, rerenderinherit, event)
              }
            }
          }
        }
      }
    }
  }
}
