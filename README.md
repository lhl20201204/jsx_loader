声明
1 自定义loader将模板转化成js了，babel-loader的作用，只是将箭头函数转化为普通函数，es6转化为es5
2 现在的话，模板只能写一些双标签，如果要使用自闭合标签，模板得写成<input></input>
3 如果要{}内使用函数的话，例如，写成箭头函数 xx={()=>{}}，或者直接写函数值{this.fn},<div>{this.state.map((v)=>{
  return <div>{v}</div>
})} </div>
4 自定义loader不提供纠错检测，不过可以在vscode 编辑器的左下角将文件样式由“纯文本”改成“JavaScript react”，有高亮和语法检测 
5 Myreact 里暂时没有写diff，是以组件为单位去直接替换的。
6 目前Myreact只提供了一些基本的onclick，className（这个暂时没法加css，还在考虑实现中，只有class而已，没法做到正版那样替换使用模块引入样式）
