/*
 * 箭头函数 VS 普通函数
 *   1、箭头函数中没有单独的THIS，它的THIS取决于宿主环境（不要乱用箭头函数，合适的时候使用箭头函数有助于开发）
 *   2、没有ARGUMENTS（类数组），但是提供了剩余运算符（...arg），用它来接收传递的实参集合（数组）
 *   3、ES6为函数提供参数默认值
 *   ...
 */

let sum = (...arg)=> arg.reduce((prev, next)=> prev + next);

//=>[OK]
// module.exports.sum = sum;  给默认的堆内存中增加属性
// module.exports = {sum: sum}; 新开辟一个堆内存
// exports.sum = sum; //=>module.exports=exports=this={}...

//=>[NO]
// exports = {sum: sum};
//=>NODE当中是通过module进行模块管理的，module.exports是当前NODE导出模块的主要方式（module.exports是个对象[堆内存]，这里面存放什么，都相当于导出什么）：以后想要导出什么，只要把东西放在module.exports对应的堆内存中即可

// module.exports.a = 1;
// exports.b = 2;
// // exports = {c: 3};
// module.exports = {c: 3};
// exports.d = 4;

module.exports = {
    sum: sum
};