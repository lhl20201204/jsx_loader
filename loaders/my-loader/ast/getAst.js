const removeSpace = require("./removeSpace")
const parse = require("./parse")
module.exports = function (template) {
  template = removeSpace(template)
  //console.log(template)
  return parse(template)
}