let express = require('express'),
    app = express();
app.listen(8888, ()=> {
    console.log(`server is success~`);
});

//=>真实项目中,我们一般都静态资源文件(HTML/CSS/JS/IMG...)存放在DIST或者LIB或者PUBLIC或者BUILD等指定的文件夹中
app.use(express.static('dist'));
app.use(express.static('public'));

//=>大体实现原理
let fs = require('fs'),
    path = require('path');
let expressStatic = p=> (req, res, next)=> {
    let pathname = path.join(`${__dirname}/${p}`, req.path);
    fs.readFile(pathname, (err, data)=> {
        if (err) {
            //=>找不到指定的文件
            next();
        } else {
            //=>找到文件
            res.sendFile(pathname);
        }
    });
};
app.use(expressStatic('dist'));


