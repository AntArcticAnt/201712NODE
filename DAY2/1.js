// setTimeout(()=> {
//     console.log(1);
// }, 0);//=>0不是立即执行(有最小等待时间5~6MS)

setTimeout(()=> {
    console.log(1);
}, 10);

setTimeout(()=> {
    console.log(2);
}, 5);

//let s = new Date();
// for (let i = 0; i < 10000000; i++) {}
//console.log((new Date()) - s); 监听程序执行时间的方式

// console.time('for');
// for (let i = 0; i < 10000000; i++) {}
// console.timeEnd('for');  NODE环境中单独提供的输出方式，可以让我们监听程序的处理时间（for是我们起的标识，只要两次一致即可）

// for (let i = 0; i < 10000000; i++) {
// }
// console.log(3);

process.nextTick()