let moduleA = require('./A');//=>导入自己的模块需要指定好具体的地址(同级导入也需要加./)，如果不加具体的地址标识符，首先看是否为安装的第三方模块，不是的话，再看是否为内置模块...

// let avg = (...arg)=> {//=>...arg剩余运算符
//     //=>arg:数组
//     moduleA.sum(...arg);//=>...arg展开运算符（把数组中每一项的值展开，一项项的传递给对应的函数: moduleA.sum.apply(null,arg)）
//     //=>...在解构赋值中相当于拓展运算符
// };

let avg = (...arg)=>moduleA.sum(...arg) / arg.length;

module.exports = {
    avg: avg
};