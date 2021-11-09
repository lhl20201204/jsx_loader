const MyReact = require("../../myReact/react")
const getAst = require("./ast/getAst")
const codegen = require("./codegen/index")
module.exports = (template, templateToCode) => {
  // console.log('模板\n', template)
  let ast = getAst(template)
  // console.log('语法树', ast)
  // console.log('代码\n', codegen(getAst(template)))
  //return `MyReact.createElement("div", {}, "hello world")`
  //console.log("test", templateToCode)
  let t = codegen(ast, templateToCode)
  //console.log('转换', t)
  return `${t}`
}