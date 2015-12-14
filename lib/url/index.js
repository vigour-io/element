window.onpopstate = function(event) {
  console.log("pathname: "+location.pathname)
}

exports.buildUrl = function (val) {
  var href = window.location.href
  window.history.pushState({}, val, val.replace(/ /g, '+').toLowerCase() )
}

exports.parseUrl = function (val) {
  url = urlapi.parse(val)
  console.log(
	  url.href + '\n' +			// the full URL
	  url.protocol + '\n' +		// http:
	  url.hostname + '\n' +		// site.com
	  url.port + '\n' +			// 81
	  url.pathname + '\n' +		// /path/page
	  url.search + '\n' +			// ?a=1&b=2
	  url.hash					// #hash
  )
  console.error(url.pathname)
}
