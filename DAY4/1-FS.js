let fs = require('fs');

//=>同步读取
// let con = fs.readFileSync('./index.html');
// console.log(con);//=>BUFFER
// con = fs.readFileSync('./index.html', 'utf8');
// console.log(con);//=>STRING 设置UTF8后,会自动把BUFFER格式的数据转换为字符串格式的数据
// console.log('ok');//=>最后执行:同步读取,需要等内容读取完成才会执行下面的任务

//=>异步读取
// console.time('readFile');
// let con = fs.readFile('./index2.html', 'utf8', (err, result)=> {
//     //=>回调函数就是NODE的事件驱动机制:当文件读取成功或者失败的时候,会触发回调函数执行(并且传递两个实参值)
//     //=>err(error):当读取出错,信息保存在err中,如果没有出错,err为null
//     //=>result:当读取成功,信息保存在result中(第二个参数不设置utf8,获取的结果依然是Buffer格式的数据)
//     console.timeEnd('readFile');
//     if (err) {
//         //=>出错了:真实项目中我们会把错误信息记录在错误日志中
//         console.log(err);
//         return;
//     }
//     console.log(result);
// });
// //console.log(con);//=>undefined 异步读取文件,方法没有返回值
// console.log('ok');//=>OK是先输出的

//========================
/*
 * 特点：
 * 1、如果当前文件没有，我们会自动创建文件，然后再写入内容（但是并不是万能的：如果指定的地址中不存在这个文件夹，NODE无法自动帮你创建文件夹，需要我们自己手动检测并创建）
 *
 * 2、文件写入属于覆盖式写入（新写入的内容会覆盖原有的内容）
 *
 * 3、写入的内容需要是字符串或者BUFFER格式的数据
 */
//let res = fs.writeFileSync('./TEMP.txt', 'HELLO', 'utf8');
//console.log(res);//=>undefined 写入的方法没有返回值

// fs.writeFile('./TEMP.txt', '珠峰培训', 'utf8', (error)=> {
//     //=>这里面只有ERROR一个参数:代表写入成功还是失败
//     console.log(error);
// });

//=>appendFile && appendFileSync
//=>用法和writeFile类似,不一样的地方在于：
//1、appendFile写入属于追加式写入（原有内容不改变），而writeFile输入覆盖式写入（覆盖原有的内容）
fs.appendFile('./TEMP.txt', 'HELLO', 'utf8', error=> {
    if (error) {
        console.log(error);
        return;
    }
    console.log('success');
});
















