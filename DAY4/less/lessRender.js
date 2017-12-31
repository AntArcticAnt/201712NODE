let fs = require('fs'),
    less = require('less');

//=>1、读取LESS目录中(当前目录)所有的文件,并且筛选出后缀名是LESS的文件进行下一步处理
fs.readdir('./', (err, dirList)=> {
    if (err) return;
    dirList = dirList.filter((item, index)=> {
        let reg = /\.less$/i;
        return reg.test(item);
    });


    //=>2、读取每一个LESS文件中的内容
    dirList.forEach(item=> {
        fs.readFile(`./${item}`, 'utf8', (err, result)=> {
            if (err) return;

            //=>3、把获取的LESS代码进行编译
            less.render(result, {
                compress: true
            }, (err, result)=> {
                if (err) return;

                result = result.css;
                //=>4、把编译后的结果写入到CSS文件夹中
                fs.writeFile(`../css/${item.replace(/\.less$/gi, '.min.css')}`, result, 'utf8');
            });
        });
    });
});