let express = require('express'),
    router = express.Router();
router.get(`/info`, (req, res)=> {
    res.send(`get info`);
});
router.post(`/info`, (req, res)=> {
    res.send(`post info`);
});
module.exports = router;