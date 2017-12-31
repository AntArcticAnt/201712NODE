let fs = require('fs');

// let dirList = fs.readdirSync('./');
// console.log(dirList);
// fs.readdir('./', (error, result)=> {
//     if (error) {
//         console.log(error);
//         return;
//     }
//     console.log(result);//=>获取一个数组集合,集合中包含当前目录中(./)所有的文件及文件夹信息
// });

/*
 * 特点
 * 1、可以创建文件夹，如果当前文件夹已经存在，返回的是错误的信息，不会重新的创建
 *
 * 2、不能一次创建多级结构目录，例如：./TEMP/DAY1/CSS 这样的多级目录无法一次创建，需要先创建TEMP，然后再创建DAY1...
 */
// fs.mkdir('./TEMP', (error)=> {
//     if (error) {
//         console.log('error');
//         return;
//     }
//     console.log('success');
// });

/*
 * 创建文件夹
 *   path: './TEMP' 、'./TEMP/DAY1' 、'./TEMP/DAY1/CSS' ...
 */
// let makeDir = function (path) {
//     let pathAry = path.split('/'),
//         [root,...arg]=pathAry;
//     root = root + '/';
//
//     let make = n=> {
//         if (n >= arg.length) return;
//         let curPath = arg[n];
//         fs.mkdir(root + curPath, error=> {
//             root += curPath + '/';
//             make(n + 1);
//         });
//     };
//     make(0);
// };
// makeDir('./TEMP');

fs.copyFile('./yarn.lock', 'yarn2.lock', error=> {
    console.log(error);
});
