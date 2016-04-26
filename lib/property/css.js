   const getParentNode = require('./render/dom/parent')

    css: new Property({
      render (state, type, stamp, subs, tree, ptree, rtree, pnode) {
        const val = state ? this.compute(state.compute()) : this.compute()
        pnode = pnode || getParentNode(this.uid(), this, state, type, stamp, subs, tree, ptree, rtree)
        if (pnode && !this.parent.namespace) {
          let key = this.parent.key
          // only when not svg for example
          if (key) {
            pnode.className = val ? key + ' ' + val : key
          } else if (val) {
            pnode.className = val
          }
        }
      }
    }),