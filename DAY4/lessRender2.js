let fs = require('fs'),
    less = require('less');

//=>配置LESS解析器
let parser = new (less.Parser)({
    paths: ['.', './less']
});
let con = fs.readFileSync('./less/index.less', 'utf8');
parser.parse(con, (err, result)=> {
    console.log(result.toCSS({compress: true}));
});
