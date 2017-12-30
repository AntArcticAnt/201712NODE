let http = require('http'),
    url = require('url'),
    fs = require('fs');
let mime = require('./BACK/mime');

http.createServer((req, res)=> {
    let {url:reqURL, method, headers}=req,
        {pathname, query, hash}=url.parse(reqURL);

    //=>通过请求的PATH-NAME获取后缀名(通过后缀名获取MIME)
    let regPATH = /\.([a-zA-Z0-9]+)/i;
    if (regPATH.test(pathname)) {//=>请求的是资源文件(特点:文件都有对应的后缀名)
        let suffix = regPATH.exec(pathname)[1],
            suffixMIME = mime.query(suffix);
        let con = '',
            status = 200;
        try {
            con = fs.readFileSync(`.${pathname}`);
        } catch (e) {
            con = 'not found!';
            status = 404;
        }
        res.writeHead(status, {
            'content-type': suffixMIME
        });
        res.end(con);
    }


}).listen(9999);