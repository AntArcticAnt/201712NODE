let http = require('http'),
    fs = require('fs');

http.createServer((req, res)=> {
    let {url, method}=req;
    let con = ``,
        status = 200;
    try {
        con = fs.readFileSync(`.` + url, 'utf8');
    } catch (e) {
        //=>如果文件不存在,不让程序抛异常崩溃,而是返回找不到即可(状态码404代表请求的文件不存在)
        con = `not found~`;
        status = 404;
    }
    //=>手动在响应头中设置响应内容的MIME类型
    //获取请求资源文件的类型（通过后缀名）
    console.log(url);

    res.writeHead(status);
    res.end(con);

}).listen(9999, ()=> {
    console.log('server running');
});