
var url = require('url');
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');  /*step5  模板引擎*/

/* step3 搭建 express 框架*/
var express = function(){
	var tasks = [];
	/*return function(req,res){   }*/
	var app = function(req,res){

		makeQuery(req);
    makeResponse(res);
    addRender(req,res,app);

		/*查看任务数组，执行*/
		var i=0;
		function next(){
			var task = tasks[i++];
            if(!task){ return }
             
            var pathname = url.parse(req.url,true).pathname;
            if(task.routePath===null || pathname === task.routePath){
               task.middleWare(req,res,next)
            }else{
            	//如果说路由未匹配上的中间件或其他，直接下一个
            	next();
            }

		}


     next();
	}


    app.use = function(routePath, middleWare){
    	if(typeof(routePath)==='function'){
    		middleWare=routePath;
    		routePath=null;	
    	}
    	/*tasks[routePath]=middleWare;*/
    	/*把任务加到数组上，没有执行*/
    	tasks.push({
    		routePath: routePath,
    		middleWare: middleWare
    	})

    }

  app.data = {};
  app.set = function(key,value){
    app.data[key]=value;
  }
  app.get = function(key){
    return app.data[key];
  }



	return app;
}




/*req 加上 query 属性*/
function makeQuery(req){
  req.query = url.parse(req.url,true).query; 
}

/*对 res.send() 发送的数据处理*/
function makeResponse(res){
  res.send = function(toSend){
  	if(typeof(toSend)==='string'){
  		res.end(toSend);
  	}
  	if(typeof(toSend)==='object'){
  		res.end(JSON.stringify(toSend));
  	}
  	if(typeof(toSend)==='number'){
  		res.writeHead(toSend,arguments[1])
  		res.end();
  	}
  }

}
/* step4: 1.express框架加上静态服务器 */

express.static=function(staticPath){
  return function(req,res,next){
    var pathname = url.parse(req.url,true).pathname;
    console.log(pathname)
    if(pathname==='/'){
      pathname+='index.html';
    }
    var filePath = path.join(staticPath,pathname.substr(1));
    fs.readFile(filePath,'binary',function(err,content){
      if(err){
       /* res.writeHead(404,'not found -_-!');
        res.end('not found -_-!');*/
        next();
      }else{
        res.writeHead(200,'ok~');
        res.end(content,"binary")
      }
    })
  }
}


/*step5 模板引擎*/

function addRender(req,res,app){
   
   res.render=function(tplPath,data){
console.log(app.get('view'));
    var fullPath = path.join(app.get('view'),tplPath);
    
   /*fullPath 模板文件的位置， data 要转换文件的内容 str 转换结果*/
    ejs.renderFile(fullPath, data, {}, function(err, str){
      if(err){
         res.writeHead(503,'System error');
         res.end();
      }else{

         res.setHeader('content-type', 'text/html')
         res.writeHead(200, 'Ok')
         res.write(str)
        res.end() 
      }
     });
   }
  }

module.exports = express;