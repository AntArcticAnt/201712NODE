let http = require('http'),
    url = require('url'),
    fs = require('fs'),
    mime = require('mime');
http.createServer((req, res)=> {
    //=>GET AND FORMAT REQUEST INFO
    let {
            url:reqURL,
            method,
            headers
        }=req,
        {
            pathname,
            query
        }=url.parse(reqURL, true);

    //=>HANDEL STATIC FILE (CREATE WEB SERVER)
    let regPATH = /\.([a-zA-Z0-9]+)/i;
    if (regPATH.test(pathname)) {
        let suffix = regPATH.exec(pathname)[1],
            suffixMIME = mime.getType(suffix);
        let con = '',
            status = null;
        try {
            con = fs.readFileSync(`.${pathname}`);
            status = 200;
        } catch (e) {
            con = 'NOT FOUND!!';
            status = 404;
        }
        res.writeHead(status, {'content-type': suffixMIME});
        res.end(con);//=>RESULT TYPE:STRING OR BUFFER
    }

}).listen(9999, ()=> {
    console.log('server is ready~');
});