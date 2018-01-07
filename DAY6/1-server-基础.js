let express = require('express'),
    app = express();
app.listen(8888, ()=> {
    console.log(`server is success~`);
});

app.get(`/getMatchList`, (req, res)=> {
    //=>等价于原生
    //req.url  请求的地址+问号传参
    //req.method 请求的方式(大写)
    //req.headers 请求头(小写)

    //=>EXPRESS新提供的
    //req.path 相当于我们原生中通过URL内置模块的PARSE方法解析出来的PATH-NAME
    //req.query 相当于解析出来的QUERY

    //=>等价于原生
    //res.writeHead 重写响应头
    //res.write 响应主体
    //res.end 结束响应(响应主体)
    /*
     res.writeHead(200, {
     'content-type': 'application/json'
     });
     res.end(JSON.stringify({"id": 1, "name": "珠峰培训 "}));//=>只能返回字符串或者Buffer格式数据

     //---------
     fs.readFile('./index.html',(err,data)=>{
     if(err) return;
     res.writeHead(200,{
     'content-type':'text/html'
     });
     res.end(data);
     });

     //=>好麻烦
     */

    //=>EXPRESS独有的
    //res.sendFile('./index.html',{root:__dirname}); 读取指定的文件，并且把内容响应给客户端
    //res.json({"id":1,"name":"珠峰"}); 我们可以直接放JSON,EXPRESS帮我们把它转换为字符串返回给客户端（并且设置好了响应头信息）
    //res.send() 综合体
    //res.statusCode = 200; 设置状态码
    //res.redirect() 重定向(对应状态码中的302/301)
    //res.sendStatus(404); 返回状态码并且附带一些状态码的描述信息
    //...
});
app.post(`/reg`, (req, res)=> {

});

//__dirname:当前文件的绝对路径
