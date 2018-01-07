let express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path');

router.use(`/join`, (req, res, next)=> {
    //=>获取最大的MATCH-ID
    let userData = req.myUserData.slice(0);
    userData.sort((a, b)=> {
        return parseFloat(b['matchId']) - parseFloat(a['matchId']);
    });
    req.maxMathId = parseFloat(userData[0]['matchId']);
    next();
});
router.get(`/join`, (req, res)=> {
    /*
     * 1、获取所有的用户信息（应该提取到中间件中） 并且 获取客户端传递进来的USER-ID以及SLOGAN
     * 2、在所有用户中筛选出ID和传递进来的USER-ID相同的一项
     * 3、把这一项中的isMath设置为1，slogan设置为传递的标语
     * 4、设置matchId自增长（获取现有matchId中最大的一个，在原有基础上累加1即可）
     * ...
     */
    let userData = req.myUserData,
        {userId, slogan}=req.query;//=>POST通过req.body获取传递的内容即可
    let userInfo = userData.filter(item=>item['id'] == userId);
    if (userInfo.length > 0) {
        userInfo = userInfo[0];
        userInfo.isMatch = 1;
        userInfo.slogan = slogan;

        let matchId = req.maxMathId + 1;
        userInfo.matchId = matchId < 10 ? `00${matchId}` : (matchId < 100 ? `0${matchId}` : matchId);

        //=>遍历USER-DATA中当前操作这一项,把最新的信息替换原有的信息,把替换后的信息写入到文件中(返回客户端状态)
        userData = userData.map((item, index)=> {
            if (item['id'] == userInfo['id']) {
                return userInfo;
            }
            return item;
        });
        fs.writeFile(req.userPath, JSON.stringify(userData), 'utf8', err=> {
            if (err) {
                res.send({code: 1, message: 'error'});
                return;
            }
            res.send({code: 0, message: 'success'});
        });
        return;
    }
    res.send({code: 1, message: 'error'});
});

module.exports = router;