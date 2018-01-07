let express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    app = express();
app.listen(8888);

//=>STATIC
app.use(express.static('dist'));

//=>API
//=>获取传递请求主体的中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
//=>获取数据的一些中间件操作
app.use((req, res, next)=> {
    new Promise((resolve, reject)=> {
        let userPath = path.join(__dirname, `./routers/json/USER.JSON`);
        req.userPath = userPath;
        fs.readFile(userPath, 'utf8', (err, data)=> {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    }).then(result=> {
        req['myUserData'] = JSON.parse(result);
        next();
    }).catch(err=> {
        res.send('query user info error~');
    });
});

app.use(`/match`, require(`./routers/match`));
app.use(`/user`, require(`./routers/user`));

//=>404
app.all(`*`, (req, res)=> {
    res.sendStatus(404);
});