let express = require('express'),
    app = express();
app.listen(8888, ()=> {
    console.log(`server is success~`);
});

//=>所有的客户端请求都会先执行这个中间件(然后执行NEXT后在进入下一个处理程序)
app.use((req, res, next)=> {
    //next:执行下一个处理(当前这个中间件根据情况，如果需要走到下一个操作，必须执行NEXT，如果不需要，直接响应内容即可)
    if (req.query.name) {
        req.userName = req.query.name;//=>把获取的内容写在了userName自定义属性上
        next();
    } else {
        res.send(`name必须传递`);
    }
});
//=>只有请求的地址中包含`/user`的才会进入这个中间件
app.use(`/user`, (req, res, next)=> {
    req.userName += '@';
    next();
});
app.get(`/user`, (req, res)=> {
    res.send(`My name is ${req.userName}`);
});
app.get(`/article`, (req, res)=> {
    res.send(`Article author is ${req.userName}`);
});