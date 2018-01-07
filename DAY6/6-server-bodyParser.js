let express = require('express'),
    app = express();
app.listen(8888, ()=> {
    console.log(`server is success~`);
});

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.post(`/reg`, (req, res)=> {
    res.send(req.body);
});