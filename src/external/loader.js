const fontName = []
const cssName = [
]

const jsName = [
  'src/external/namespace.js',
]


function load(fileList, temp) {
  var list = ''
  fileList.forEach(function(name) {
    list += temp(name)
  })
  document.write(list)
}

// build env
debugger
if (typeof exports === "object" && typeof module !== "undefined") {
  debugger
  exports.cssName = cssName
  exports.jsName = jsName
  exports.fontName = fontName
} else {
  //for index.html
  load(cssName.concat(fontName), function(name) {
    return '<link type="text/css" rel="stylesheet" href="' + name + '?random=' + Math.random() + '">'
  })
  load(jsName, function(name) {
    return '<script type="text/javascript" src="' + name + '?random=' + Math.random() + '"><\/script>'
  })
}

