let fs = require('fs');

let callBack = (resolve, reject, err, res)=> {
    if (err) {
        reject(err);
        return;
    }
    resolve(res);
};

let HandIO = ({path, con = '', type = 'readFile'}={})=> {
    /*
     * [ type ]
     *   readFile
     *   readdir
     *
     *   writeFile
     *   appendFile
     */
    return new Promise((resolve, reject)=> {
        if (type.includes('read')) {
            fs[type](path, 'utf8', callBack.bind(this, resolve, reject));
            return;
        }
        fs[type](path, con, 'utf8', callBack.bind(this, resolve, reject));
    });
};

HandIO({
    path: './index2.html'
}).then(res=> {
    console.log(res);
}).catch(err=> {
    console.log(err);
});
