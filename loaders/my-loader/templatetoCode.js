const trans = require("./trans")
var templateToCode = function (code, options) {
  //let match = code.match(/([\W\w]*?return\s+\()([\W\w]*?)(\)[\W\w]*?)/)
  //let match = code.match(/([\W\w]*?)(\<(.*?)\/?\>)([\W\w]*?)/)
  // code = code.replace(/\<.*?\>[\W\w]*?\<.*?\>/, function (node, key) {
  //           console.log(node,)
  // })
  //console.log('handle', match[2])
  return code.replace(/\<.*?\>[\W\w]*\<\/.*?\>/g, function (node) {

    return trans(node, templateToCode)
  })
}
module.exports = templateToCode