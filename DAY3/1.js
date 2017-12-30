// let str = '/index.html?lx=12&age=13#aa';
// let [pathname,parameters = '']=str.split('?');
//
// let reg = /#?([^?=&#]+)(?:=([^?=&#]*))?/g,
//     obj = {};
// 'lx=12&age'.replace(reg, (...arg)=> {
//     let [capture,key,val]=arg;
//     if (capture.indexOf('#') > -1) {
//         obj['HASH'] = key;
//         return;
//     }
//     obj[key] = val;
// });
// console.log(obj);

let url = require('url');
let str = 'http://www.zhufengpeixun.cn:80/index.html?lx=12&age#aa';
console.log(url.parse(str, true));

