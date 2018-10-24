
var path = require('path');
var express = require('./lib/express');
var bodyParse = require('./lib/bodyParse');
/*express是个函数, express执行结果返回函数，return function(req,res){}*/
var app= express();


/*express执行结果返回的函数，有use 属性 ，该属性的值是个函数，
 且函数的参数不同

 app.use = function(fn)  fn 不同*/
 /*中间间 有next() */


/* step4 2. 请求参数处理(处理 input 的数据) */
/*bodyParse 是函数 */
app.use(bodyParse);
 /* step4 1. 静态服务器 */
/*express 的static 属性是函数，返回结果是个函数*/
app.use(express.static(path.join(__dirname,'static')));

app.use(function(req,res,next){
	console.log('middleware 1');
	next();
})




app.use(function(req,res,next){
	console.log('middleware 2');
	next();
})


app.use('/hello',function(req,res){
	console.log('/hello');
	if(req.query.name){
    res.end('<h1>hello,'+req.query.name+'!</h1>');
	}else{
    res.end('<h1>hello</h1>');
	}
	
})

app.use('/getWeather',function(req,res){
	console.log('/getWeather');
	res.send({
		url:'/getWeather',
		city: req.query.city
	});
})

app.use('/search',function(req,res){
	console.log('/search~~');
	console.log(req.body)
	res.send(req.body);
})


app.use(function(req,res){
	res.send(404,'not found -_-');
})

module.exports = app;