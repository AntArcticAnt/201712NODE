let fs = require('fs');
//=>异步读取
//fs.readFile()

//=>同步读取
let con = fs.readFileSync('./readme.md', 'utf8');
console.log(con);