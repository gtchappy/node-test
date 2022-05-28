var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  if (path === '/') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`

    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/x" 
</head>
    
    <body>
    <div><p>金女士我喜欢你(●'◡'●)</p></div>
    <div id="heart">
   

        <div class="left"></div>
        <div class="right"></div>
        <div class="bottom"></div>
    </div>
</body>

</html>
    
    
    `)
    response.end()
  } else if (path === '/x') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`
    * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

#heart {
    position: relative;
    margin: 100px;
    /* border: 1px solid red; */
    display: inline-block;
    /* left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);  */
    /* transition: all .5s; */
    animation: xxx 0.7s 1s alternate infinite;
    
}

@keyframes xxx {
    0% {
        transform: scaleX(1);
    }

    50% {
        transform: scale(1.5);
    }

    100% {
        transform: scale(1) scale(1.5);
    }

}

#heart>.bottom {
    width: 50px;
    height: 50px;
    /* border: 1px solid rgb(18, 85, 228); */
    background-color: red;
    transform: rotate(45deg);
    /* position: absolute; */
}



#heart > .left {
    width: 50px;
    height: 50px;
    /* border: 1px solid rgb(21, 192, 222); */
    background-color: red;
    /* border-radius: 50%; */
    position: absolute;
    bottom: 100%;
    left: 100%;
    transform: rotate(45deg) translateY(41px);
    border-radius: 50% 50% 0 0;
}

#heart>.right {
    width: 50px;
    height: 50px;
    /* border: 1px solid rgb(215, 16, 16); */
    background-color: red;
    /* border-radius: 50%; */
    position: absolute;
    bottom: 100%;
    right: 100%;
    transform: rotate(45deg) translateX(41px);
    border-radius: 50% 0 0 50%;
}
    
    `)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你输入的路径不存在对应的内容`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
