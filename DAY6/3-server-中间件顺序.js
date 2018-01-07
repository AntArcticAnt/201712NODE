let express = require('express'),
    app = express();
app.listen(8888, ()=> {
    console.log(`server is success~`);
});
app.use((req, res, next)=> {
    console.log(`1`);
    next();
    console.log(`哈哈`);
});
app.use((req, res, next)=> {
    console.log(`2`);
    next();
    res.send({
        "id": 1,
        "name": "珠峰"
    });
});
app.get(`/user`, (req, res)=> {
    console.log(`3`);
    console.log(`嘿嘿`);
});