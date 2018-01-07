app.use(`/reg`, (req, res, next)=> {
    //=>POST请求获取请求主体内容,需要基于事件完成
    let str = ``;
    req.on('data', chunk=> {
        //=>正在接收请求主体中的内容(一般内容偏多)
        str += chunk;
    });
    req.on('end', ()=> {
        //=>接收结束,此时STR存储的就是传递进来的信息
        //=>客户端传递给服务器的信息一般都是字符串格式的(JSON字符串或者普通的FORMAT-DATA字符串[xxx=xxx&xxx=xxx])

        //=>真实项目中我们还要把字符串转化为对象方式(方便操作)
        let data = require('querystring').parse(str);//=>这个内置模块就是把FORMAT-DATA变为对象键值对的方式存储
        req.body = data;//=>把解析后的数据放到REQ的自定义属性上,在其它的方法中可以获取使用
        next();
    });
});
app.post(`/reg`, (req, res)=> {
    res.send(req.body);
});