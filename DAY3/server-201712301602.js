let http = require('http'),
    fs = require('fs');//=>对服务器上的文件进行I/O操作的内置模块

http.createServer((req, res)=> {
    let {url, method}=req;

    if (url === '/index.html') {//=>为啥加斜杠：REQ.URL获取的结果都会在前面加一个斜杠
        let con = fs.readFileSync('./index.html', 'utf8');//=>获取的结果是字符串

        res.end(con);//=>返回的也是源代码字符串
    }

    if (url === '/css/index.css') {
        let con = fs.readFileSync('./css/index.css', 'utf8');
        res.end(con);
    }

}).listen(9999, ()=> {
    console.log('server running');
});