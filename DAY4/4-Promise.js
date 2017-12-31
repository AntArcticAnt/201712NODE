let fs = require('fs');

// fs.readFile('./index.html', 'utf8', (err, res)=> {
//     if (err) {
//         //=>出现错误后的相关处理
//         return;
//     }
//     //=>正常读取后的相关处理
//     console.log(res);
// });

read('./index.html').then(res=>{}).catch(err=>{});

/*
 * 1、当 new Promise 的时候，浏览器会立即执行回到函数中的异步操作代码（异步操作代码没有完成呢），此时的Promise处于pending准备状态（正在监听当前异步操作是否完成）
 *
 * 2、当Promise主体中的异步操作完成
 *
 *
 * Promise实例上有两个方法：
 *   then
 *   catch
 */

// new Promise((resolve, reject)=> {
//     //=>编写一些异步操作代码(AJAX或者一些其它异步代码)
//     console.log('no');//=>1)
//     fs.readFile('./index.html', 'utf8', ()=> {
//         console.log('already');//=>3)
//     });
// });
// console.log('ok');//=>2)

// new Promise((resolve, reject)=> {
//     //=>resolve:Promise.resolve 程序处理成功执行的方法
//     //=>reject:Promise.reject 程序处理失败执行的方法
//     fs.readFile('./index2.html', 'utf8', (err, res)=> {
//         //=>我们需要自己根据获取成功还是失败,来控制RESOLVE还是REJECT执行,只有这样才会触发THEN中的某个回调函数执行
//         if (err) {
//             reject(err);
//             return;
//         }
//         resolve(res);
//     });
// }).then((res)=> {
//     console.log(res);
// }, (err)=> {
//     console.log(err);
// });

// new Promise((resolve, reject)=> {
//     fs.readFile('./index.html', 'utf8', (err, res)=> {
//         if (err) {
//             reject(err);
//             return;
//         }
//         resolve(res);
//     });
// }).then(res=> {
//     console.log(res);
// }).catch(err=> {
//     //=>在Promise中执行reject方法也会触发catch
//     //=>Promise中的代码执行报错触发catch
//     //=>上一个then中的代码执行报错也会触发catch
//
//     //=>官方建议我们用CATCH代替传统THEN第二个REJECT状态下的回调函数操作,因为CATCH很强大,不仅REJECT状态下会触发它执行,而且代码报错也会触发执行（阻断了异常的抛出）
//     console.log(err);
// });

// new Promise((resolve, reject)=> {
//     fs.readFile('./index.html', 'utf8', (err, res)=> {
//         if (err) {
//             reject(err);
//             return;
//         }
//         resolve(0);
//     });
// }).then(res=> {
//     //=>第一次成功
//     console.log(res);//=>0
//     return 10;
// }).catch(err=> {
//     console.log(err);
// }).then(res=> {
//     //=>第一次完成然后做这件事（RES第一次处理的结果：返回结果）
//     console.log(res);//=>10
//     return res * 10;
// }).then(res=> {
//     //=>第二次完成然后做这件事（RES第二次处理的结果：返回结果）
//     console.log(res);//=>100
// });