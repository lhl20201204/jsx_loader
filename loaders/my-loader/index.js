const templatetoCode = require("./templatetoCode")
const trans = require("./trans")
module.exports = function (code) {
  // return ` 
  //  module.exports= (options)=>{ 
  //    const trans = ${trans};
  //    const parse = ${parse};

  //     return parse(\`${code}\`,options)
  //    }
  //  `
  code = templatetoCode(`${code}`)
  console.log(code)
  return `${code}`
}