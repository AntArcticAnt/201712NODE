let fs = require('fs');

//=>不建议这样处理
// fs.access('./index.html', fs.constants.W_OK | fs.constants.R_OK, error=> {
//     if (error) {
//         console.log('no access');
//         return;
//     }
//
//     fs.readFile('./index.html', 'utf8', (err, result)=> {
//         console.log(result);
//     });
// });