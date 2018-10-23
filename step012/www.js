

var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');
var server=http.createServer(function(req,res){

/******************step0: 直接写********************************************/
	/*res.setHeader('Content-Type','text/html ; charset=utf-8');
	res.writeHead(200,'LLL');
	res.write('<html><head><meta charset="utf-8"><title>nodeServer</title></head>');
	res.write('<body><h1>LLL</h1></body>');
	res.end();*/

/******************step1: 静态服务器********************************************/

  /*本地文件地址*/
  /*var staticPath = path.join(__dirname,'static'); 
  staticRoot(staticPath,req,res);*/


/******************step2: 路由解析********************************************/

   routePath(req,res);

})


server.listen(8080);
console.log('localhost:8080');



/******step1： 静态服务器函数**************/
function staticRoot(staticPath,req,res){
  console.log(staticPath);
 var pathname=url.parse(req.url,true).pathname;
 console.log(req.url);
 console.log(pathname);
 if(pathname==='/'){
 	pathname+='index.html'; /*默认从index.html开始*/
 }
 /*拼接成文件的地址*/
 var filePath=path.join(staticPath,pathname);
 fs.readFile(filePath,'binary',function(err,content){
 	if(err){
       res.writeHead(404,'not found');
       res.end('<h1>404 Not Found -_- </h1>');
 	}else{
 	   res.writeHead(200,'ok~');
       res.write(content,'binary');
       res.end();
 	}
 })
}

/******************step2: 路由解析********************************************/
/******************根据 input 的内容来进行相应操作********************************************/
/*路由 不同的功能 发送req.query 以及 req.body */
/*测试：localhost:8080/a?a=1&b=2
        match /a
        {"a":"1","b":"2"}-->pathObj.query
*/
var routes = {
  '/a': function(req, res){
  	res.writeHead(200,'ok~');
  	res.write('<h1>match /a </h1>');
    res.end(JSON.stringify(req.query));
  },

  '/b': function(req, res){
    res.end('<h1>match /b </h1>');
  },

  '/a/c': function(req, res){
    res.end('<h1>match /a/c </h1>')
  },

  '/search': function(req, res){
  	res.write('<h1>match /search </h1>');
    res.end('<h1>username='+req.body.username+',password='+req.body.password+'</h1>');

  }

}

  function routePath(req,res){

   var pathObj = url.parse(req.url,true);
   /*匹配路由器*/
   var handleFn = routes[pathObj.pathname]; 

   if(handleFn){
   	/* req 的data 和 end 事件，给req 加上 query 和 body属性*/
   	 req.query=pathObj.query;
     var body='';
     /* data事件，获得的是pathObj的serch属性*/
     req.on('data',function(chunk){
     	console.log("chunk=");
     	console.log(chunk);
        body+=chunk;
     }).on('end',function(){
     	console.log(body);
     	var obj = parseBody(body);
     	console.log(obj);
     	req.body=obj;
     	handleFn(req,res);
     })

   }else{
     	var staticPath = path.join(__dirname,'static');
    	staticRoot(staticPath,req,res); /*静态服务器*/
   }
 }


  function parseBody(body){
  	var obj=[];
  	body.split('&').forEach(function(str){
       obj[str.split('=')[0]]=str.split('=')[1];

  	})
    return obj;
  }