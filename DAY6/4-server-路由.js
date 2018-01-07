let express = require('express'),
    app = express();
app.listen(8888, ()=> {
    console.log(`server is success~`);
});
app.use(`/user`, require('./routers/user'));
app.use(`/log`, require('./routers/log'));