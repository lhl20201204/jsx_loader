const MyReact = require("../../../myReact/react/index")
const isHTMLTag = 'html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot'

function getProps (obj, ast, templateToCode) {
  var ret = "{"
  for (var key in obj) {
    let x = obj[key].match(/\{(.*)\}/)
    if (x) {
      ret += key + ":this._v(" + x[1] + "),"
    } else {
      ret += key + ":this._s(" + obj[key] + "),"
    }
  }
  // if (ast.tag && isHTMLTag.indexOf(ast.tag) === -1) {
  //   ret += 'id:' + MyReact.id++
  // }
  return ret + "}"
}
//这个去搜html标签有哪些即可

//判断如果是普通标签加双引号，如果是自定义组件不做处理
function getTag (s) {
  return isHTMLTag.indexOf(s) !== -1 ? '\"' + s + '\"' : s
}
const codegen = function (ast, templateToCode) {
  if (!ast.tag) {
    let t = ast.split(/\{(.*)\}/)
      .filter(v => v != "")
    t = t.map(v2 => {
      return ast.indexOf('{' + v2 + '}') != -1 ? 'this._v(' + templateToCode(v2) + ')' : 'this._s(' + v2 + ')'
    })
    return t
  }
  let arr = []
  if (ast.children) {
    for (var x of ast.children) {
      if (x === undefined || x === null) {
        continue
      }
      //递归
      let child = codegen(x, templateToCode)
      if (Array.isArray(child)) {
        for (c of child) {
          arr.push(c)
        }
      } else {
        arr.push(child)
      }

    }
  }
  return 'MyReact.createElement(' + getTag(ast.tag) + ', ' + getProps(ast.props, ast, templateToCode) + ', [' + arr.join(',') + '],this)'

}
module.exports = codegen