let express = require('express'),
    router = express.Router();//=>router和app其实差不多
router.use((req, res, next)=> {
    console.log(`ok`);
    next();
});
router.post(`/signin`, (req, res)=> {
    res.send('login success');
});
router.post(`/signup`, (req, res)=> {
    res.send('register success');
});
module.exports = router;//=>把创建的路由导出,方便后续调取使用