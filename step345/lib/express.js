
var url = require('url');


var express = function(){
	var tasks = [];
	/*return function(req,res){   }*/
	var app = function(req,res){

		makeQuery(req)
        makeResponse(res)

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

module.exports = express;