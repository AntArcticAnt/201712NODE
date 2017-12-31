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
            //=>name=xxx&password=xxx&phone=xxx...


        });
    }

}).listen(9999, ()=> {
    console.log('server is ready~');
});