let http = require('http'),
    fs = require('fs');

http.createServer((req, res)=> {
    let {url, method}=req;

    //=>保证SERVER.JS在当前项目的根目录下(以后查找文件的时候都是以项目根目录作为起始参照点查找:这样处理起来非常的方便)
    let con = fs.readFileSync(`.` + url, 'utf8');
    res.end(con);

}).listen(9999, ()=> {
    console.log('server running');
});