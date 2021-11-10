import Parent from "./Parent.myjsx"
import MyReactDOM from "../myReact/reactDOM"
import MyReact from "../myReact/react"
import getAst from "../loaders/my-loader/ast/getAst"
import MyComponment from "../myReact/react/MyComponment"
import loader from "../loaders/my-loader/index"
const templatetoCode = require("../loaders/my-loader/templatetoCode")

MyReactDOM.render(MyReact.createElement(Parent), document.querySelector("#app"))
// 声明
// 1 babel-loader的作用，只是将箭头函数转化为普通函数，es6转化为es5,自定义loader将模板转化成js了（主要引用了循环递归）
// 2 现在的话，模板只能写一些双标签，如果要使用自闭合标签，模板得写成<input></input>
// 3 如果要{}内使用函数的话，例如，写成箭头函数 xx={()=>{}}，或者直接写函数值{this.fn},<div>{this.state.map((v)=>{
//   return <div>{v}</div>
// })} </div>
// 4 自定义loader不提供纠错检测，不过可以在vscode 编辑器的左下角将文件样式由“纯文本”改成“JavaScript react”，有高亮和语法检测 
// 5 Myreact 里暂时没有写diff，是以组件为单位去直接替换的。
// 6 目前Myreact只提供了一些基本的onclick，className（这个暂时没法加css，还在考虑实现中，只有class而已，没法做到正版那样替换使用模块引入样式）

/* <div className="parent" >
      <button onClick={this.change}>"点我"</button>
      <div className="child">{this.state.count1}</div>
      <div>"表达式"{this.state.arr.map(function (v) {
        return v + 100
      })
      }</div>
      "我是第一个"
      <Child name="lhl" count1={count1}> </Child>
      "我是第二个"
      <Child name="scau" count1={this.state.count2}> </Child>
      <div>
        {this.state.count2}
        <span className="grand" onClick={this.change2}>
          '我是span标签里的'{this.state.spanc}'个'
        </span>
      </div>
    </div> */
// console.log(getAst(`<button onClick={()=>alert(1)}>{v + 100}</button>
//   `))

// let ast = "\"表达式\"{  this.state.arr.map((v) => <button onClick={()=>alert(1)}>{v + 100}</button>  )}"

// let t = ast.split(/\{(.*)\}/).filter(v => v != "")
// console.log("index", t, t
//   .map(v2 => ast.indexOf('{' + v2 + '}') != -1 ? 'this._v(' + (templatetoCode(v2)) + ')' : 'this._s(' + v2 + ')'))
// function parseTag (tag) {
//   let arr = []
//   var i = 0
//   let len = tag.length
//   let count = 0
//   while (i < len) {
//     let t = ""
//     while (i < len && (tag[i] != ' ' || count > 0)) {
//       if (tag[i] === "{") {
//         count++
//       }
//       if (tag[i] === "}") {
//         count--
//       }
//       t = t + tag[i]
//       i++
//     }
//     t && arr.push(t)
//     i++
//   }

//   let ret = []
//   ret.push(arr.shift())
//   let need = 0
//   let cache = ""
//   for (var i = 0; i < arr.length; i++) {
//     let ei = arr[i].indexOf('=')
//     if (need === 0) {
//       if (ei === -1) {
//         cache = cache + arr[i]
//         need = 1
//       } else if (ei === arr[i].length - 1) {
//         cache = cache + arr[i]
//         need = 2
//       } else {
//         cache = cache + arr[i]
//         ret.push(cache)
//         cache = ""
//         need = 0
//       }
//     } else if (need === 1) {
//       if (arr[i].length === 1) {
//         cache = cache + arr[i]
//         need = 2
//       } else {
//         cache = cache + arr[i]
//         ret.push(cache)
//         cache = ""
//         need = 0
//       }
//     } else {
//       cache = cache + arr[i]
//       ret.push(cache)
//       cache = ""
//       need = 0
//     }
//   }
//   return ret
// }

// parseTag('   button onClick={()  =>  alert(1)}   className ={ rjglr}')



//console.log(([1, 2, 3, 4].map(function (v) { return MyReact.createElement("div", {}, []) })))

// let x = `
// return (<div >
//   <div>"表达式"{
//     this.state.arr.map((v) => <button onClick={this.alertV}>{v + 100}</button>
//     )
//   }</div>
//   <div>
//     {this.state.count2}
//     <span className="grand" onClick={this.change2}>
//       '我是span标签里的'{this.state.spanc}'个'
//     </span>
//   </div>
// </div>)`

// loader(x)