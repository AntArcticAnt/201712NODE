##基于NODE编写API接口
@(201712)

###内置模块：FS
> 主要作用就是进行I/O操作（对服务器端的文件进行增删改查等操作）
```javascript
let fs = require('fs');
//=>接下来就可以使用它里面提供的方法了
fs.readFile
fs.readFileSync
...
```
> 我们发现FS中提供的方法一般都是两套：同步操作和异步操作各一套
> 
> 例如：
> fs.readFile 异步读取文件中的内容
> fs.readFileSync 同步读取文件中的内容
>  
> 同步和异步的区别在于：同步读取文件，文件内容没有读取完成，后面的任务无法处理，而异步不是，数据没有读取完成，下面的任务先去执行（我们也把这个特点叫做 `“无阻塞的I/O操作”`）

`readFile && readFileSync`
```javascript
//=>同步读取
let con = fs.readFileSync('./index.html');
console.log(con);//=>BUFFER

con = fs.readFileSync('./index.html', 'utf8');
console.log(con);//=>STRING 设置UTF8后,会自动把BUFFER格式的数据转换为字符串格式的数据

console.log('ok');//=>最后执行:同步读取,需要等内容读取完成才会执行下面的任务
```

```javascript
//=>异步读取
console.time('readFile');
let con = fs.readFile('./index2.html', 'utf8', (err, result)=> {
    //=>回调函数就是NODE的事件驱动机制:当文件读取成功或者失败的时候,会触发回调函数执行(并且传递两个实参值)
    //=>err(error):当读取出错,信息保存在err中,如果没有出错,err为null
    //=>result:当读取成功,信息保存在result中(第二个参数不设置utf8,获取的结果依然是Buffer格式的数据)
    console.timeEnd('readFile');
    if (err) {
        //=>出错了:真实项目中我们会把错误信息记录在错误日志中
        console.log(err);
        return;
    }
    console.log(result);
});
//console.log(con);//=>undefined 异步读取文件,方法没有返回值
console.log('ok');//=>OK是先输出的
```

`fs.writeFile && fs.writeFileSync`
> 同步或者异步向某个文件中写入内容
```javascript
/*
 * 特点：
 * 1、如果当前文件没有，我们会自动创建文件，然后再写入内容（但是并不是万能的：如果指定的地址中不存在这个文件夹，NODE无法自动帮你创建文件夹，需要我们自己手动检测并创建）
 *
 * 2、文件写入属于覆盖式写入（新写入的内容会覆盖原有的内容）
 *
 * 3、写入的内容需要是字符串或者BUFFER格式的数据
 */
//let res = fs.writeFileSync('./TEMP.txt', 'HELLO', 'utf8');
//console.log(res);//=>undefined 写入的方法没有返回值

fs.writeFile('./TEMP.txt', '珠峰培训', 'utf8', (error)=> {
    //=>这里面只有ERROR一个参数:代表写入成功还是失败
    console.log(error);
});

//=>appendFile && appendFileSync
//=>用法和writeFile类似,不一样的地方在于：
//1、appendFile写入属于追加式写入（原有内容不改变），而writeFile输入覆盖式写入（覆盖原有的内容）
fs.appendFile('./TEMP.txt', 'HELLO', 'utf8', error=> {
    if (error) {
        console.log(error);
        return;
    }
    console.log('success');
});
```

`readdir && readdirSync`
> 同步或者异步读取某一个目录下所有的文件和文件夹信息
```javascript
let dirList = fs.readdirSync('./');
console.log(dirList);

fs.readdir('./', (error, result)=> {
    if (error) {
        console.log(error);
        return;
    }
    console.log(result);//=>获取一个数组集合,集合中包含当前目录中(./)所有的文件及文件夹信息
});
```

`mkdir && mkdirSync`
> 创建文件夹
```javascript
/*
 * 特点
 * 1、可以创建文件夹，如果当前文件夹已经存在，返回的是错误的信息，不会重新的创建
 *
 * 2、不能一次创建多级结构目录，例如：./TEMP/DAY1/CSS 这样的多级目录无法一次创建，需要先创建TEMP，然后再创建DAY1...
 */
fs.mkdir('./TEMP', (error)=> {
    if (error) {
        console.log('error');
        return;
    }
    console.log('success');
});
```
> 自己实现一个方法，可以一次创建多级结构目录
```javascript
/*
 * 创建文件夹
 *   path: './TEMP' 、'./TEMP/DAY1' 、'./TEMP/DAY1/CSS' ...
 */
let makeDir = function (path) {
    let pathAry = path.split('/'),
        [root,...arg]=pathAry;
    root = root + '/';

    let make = n=> {
        if (n >= arg.length) return;
        let curPath = arg[n];
        fs.mkdir(root + curPath, error=> {
            root += curPath + '/';
            make(n + 1);
        });
    };
    make(0);
};
makeDir('./TEMP/DAY1/CSS/LESS');
```

除了上述方法以外，还有很多其它的方法，例如：copyFile、rmdir... ，大家可以观看NODE中文文档（http://nodejs.cn/api/）

###Promise设计模式
> ES6中给我们提供了一个专门处理异步程序的类：Promise类，通过Promise设计模式（使用Promise类处理的代码逻辑被称为Promise设计模式）可以有效避免回调函数嵌套的问题（避免出现：回调地狱）

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise

所有的异步操作都可以基于Promise进行重新规划

> 当 new Promise 的时候，浏览器会立即执行回到函数中的异步操作代码（异步操作代码没有完成呢），此时的Promise处于pending准备状态（正在监听当前异步操作是否完成）
```javascript
new Promise((resolve, reject)=> {
    //=>编写一些异步操作代码(AJAX或者一些其它异步代码)
    console.log('no');//=>1)
    fs.readFile('./index.html', 'utf8', ()=> {
        console.log('already');//=>3)
    });
});
console.log('ok');//=>2)
```

```javascript
new Promise((resolve, reject)=> {
    //=>resolve:Promise.resolve 程序处理成功执行的方法
    //=>reject:Promise.reject 程序处理失败执行的方法
    fs.readFile('./index2.html', 'utf8', (err, res)=> {
        //=>我们需要自己根据获取成功还是失败,来控制RESOLVE还是REJECT执行,只有这样才会触发THEN中的某个回调函数执行
        if (err) {
            reject(err);
            return;
        }
        resolve(res);
    });
}).then((res)=> {
    console.log(res);
}, (err)=> {
    console.log(err);
});
```

```javascript
new Promise((resolve, reject)=> {
    fs.readFile('./index.html', 'utf8', (err, res)=> {
        if (err) {
            reject(err);
            return;
        }
        resolve(res);
    });
}).then(res=> {
    console.log(res);
}).catch(err=> {
    //=>在Promise中执行reject方法也会触发catch
    //=>Promise中的代码执行报错触发catch
    //=>上一个then中的代码执行报错也会触发catch

    //=>官方建议我们用CATCH代替传统THEN第二个REJECT状态下的回调函数操作,因为CATCH很强大,不仅REJECT状态下会触发它执行,而且代码报错也会触发执行（阻断了异常的抛出）
    console.log(err);
});
```

###编写一个API接口：分页和模糊搜索
`API文档`
```
1、获取参赛人员列表信息
  URL：/getMatchList?limit=10&page=1&search=xxx&userId=0
    limit:每一页展示的数量
    page:当前展示第几页
    search:当前用户输入的搜索信息(为空代表展示全部)
    userId:当前登录用户的ID（如果没有登录则为0）
  METHOD：GET
  RESULT：{
    code:0,  整体返回数据状态 0->正常  1->非正常(无匹配信息)
    message:'', 对于数据状态的描述
    limit:10,
    page:1,
    pageNum:10, 总页数
    total:98, 总数据量
    list:[
        {
            id:1, 用户ID
            name:'xxx', 用户名
            picture:'xxx', 用户的头像
            sex:0, 性别
            matchId:'000', 参赛编号
            slogan:'xxx', 参赛标语
            voteNum:10, 获得的总票数
            isVote:0  我是否已经投过此人  0->没投过  1->已经投过
        },
        ...
    ]
  }
```
`具体代码`
```javascript
let http = require('http'),
    url = require('url'),
    fs = require('fs'),
    mime = require('mime');
let tool = require('./BACK/TOOL');

http.createServer((req, res)=> {
    //=>GET AND FORMAT REQUEST INFO
    let {
            url:reqURL,
            method,
            headers
        }=req,
        {
            pathname,
            query
        }=url.parse(reqURL, true);

    //=>HANDEL STATIC FILE (CREATE WEB SERVER)
    let regPATH = /\.([a-zA-Z0-9]+)/i;
    if (regPATH.test(pathname)) {
        let suffix = regPATH.exec(pathname)[1],
            suffixMIME = mime.getType(suffix);
        let con = '',
            status = null;
        try {
            con = fs.readFileSync(`.${pathname}`);
            status = 200;
        } catch (e) {
            con = 'NOT FOUND!!';
            status = 404;
        }
        res.writeHead(status, {'content-type': suffixMIME});
        res.end(con);//=>RESULT TYPE:STRING OR BUFFER
        return;
    }

    //=>AJAX API

    //=>API:获取所有参赛人员信息的接口(GET)
    if (pathname === '/getMatchList') {
        //=>GET请求接口:传递给服务器的信息都是通过URL问号传参传递的,QUERY存储的就是传递进来的参数信息(KEY:VALUE)
        let {
            limit = 10,
            page = 1,
            search = '',
            userId = 0
        }=query;

        //=>准备数据:所有已经参赛的人员信息(不能包括自己)、指定页码中的具体条数、如果有模糊查询需要做特殊处理
        tool.readAll().then(res=> {
            //=>排除自己(USER-ID当前登录用户ID)
            return res.filter(item=>item['id'] != userId);
        }).then(res=> {
            //=>模糊查询(SEARCH)
            if (search.length === 0) return res;
            return res.filter(item=>item['name'].includes(search));
        }).then(res=> {
            //=>已经参赛的
            return res.filter(item=>item['isMatch'] == 1);
        }).then(res=> {
            //=>分页处理
            let total = res.length,
                pageNum = Math.ceil(total / limit),
                list = [];
            for (let i = (page - 1) * limit; i <= page * limit - 1; i++) {
                if (i >= total) break;
                let item = res[i];
                list.push({
                    id: item['id'],
                    name: item['name'],
                    picture: item['picture'],
                    sex: item['sex'],
                    matchId: item['matchId'],
                    slogan: item['slogan'],
                    voteNum: item['voteNum'],
                    isVote: 0//=>单独处理
                });
            }
            return {
                total: total,
                pageNum: pageNum,
                list: list
            };
        }).then(result=> {
            result['code'] = result.total == 0 ? 1 : 0;
            result['message'] = '';
            result['page'] = page;
            result['limit'] = limit;

            //=>如果用户登录,验证获取的某一个用户是否已经被登录的用户投票过(常用写IS-VOTE属性值)
            if (userId != 0) {
                tool.readVote().then(voteList=> {
                    result.list.forEach((item, index)=> {
                        //=>ITEM:获取的某个用户(ITEM.ID)
                        //=>USER-ID:登录用户ID
                        let flag = voteList.some(cur=> {
                            return cur['voterId'] == userId && cur['participantId'] == item['id'];
                        });
                        flag ? result.list[index]['isVote'] = 1 : null;
                    });

                    tool.response(res, result);//=>响应
                });
                return;
            }
            tool.response(res, result);//=>响应
            return;
        });
    }

    //=>[POST]
    if (pathname === '/register') {
        //=>POST是客户端通过请求主体传递信息进来的,此时我们需要获取请求主体内容
        let data = '';
        req.on('data', chunk=> {
            data += chunk;
        });
        req.on('end', ()=> {
            //=>请求主体内容获取成功 data(string)
        });
    }

}).listen(9999, ()=> {
    console.log('server is ready~');
});
```
`TOOL模块`
```javascript
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
```