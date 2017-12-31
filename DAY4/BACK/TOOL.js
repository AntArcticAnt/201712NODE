let fs = require('fs');
module.exports = {
    //=>读取所有客户信息
    readAll(){
        return new Promise((resolve, reject)=> {
            fs.readFile('./BACK/JSON/USER.JSON', 'utf8', (err, res)=> {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(JSON.parse(res));
            });
        });
    },
    //=>读取所有的VOTE信息
    readVote(){
        return new Promise((resolve, reject)=> {
            fs.readFile('./BACK/JSON/VOTE.JSON', 'utf8', (err, res)=> {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(JSON.parse(res));
            });
        });
    },
    //=>响应信息
    response(res, result){
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(result));
    }
};