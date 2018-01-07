let fs = require('fs'),
    path = require('path');
let express = require('express'),
    app = express();
app.listen(8888);

app.use(express.static('dist'));
app.get(`/user`, (req, res)=> {
    let {callBack}=req.query;//=>'fn'

    fs.readFile(`./json/user.json`, 'utf8', (err, data)=> {
        if (err) {
            res.send({code: 1});
            return;
        }
        // res.send({code: 0, list: data});
        let result = JSON.stringify({code: 0, list: data});
        res.send(`${callBack}(${result})`);//=>`fn("{....}")`
    });
});