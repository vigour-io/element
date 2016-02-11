'use strict'
// removed title
// we can just sya dont support all ndoes (make a subset makes it alot easie rif we ever want different render engines)
var arr = 'a|abbr|acronym|abbr|address|applet|embed|object|area|article|aside|audio|b|base|basefont|bdi|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|colgroup|datalist|dd|del|details|dfn|dialog|dir|ul|div|dl|dt|em|embed|fieldset|figcaption|figure|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|i|iframe|img|input|ins|kbd|keygen|label|input|legend|fieldset|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|video|audio|span|strike|del|s|strong|style|sub|summary|details|sup|table|tbody|td|textarea|tfoot|th|thead|time|tr|track|video|audio|tt|u|ul|var|video|wbr'.split('|')
var map = {}
for (var key in arr) {
  map[arr[key]] = true
}

exports.properties = {
  _node: true
}

exports.define = {
  node: {
    set (val) {
      if (map[val]) {
        console.error('???', val, map[val])
        this._node = val
      }
    },
    get () {
      return this._node
    }
  }
}
