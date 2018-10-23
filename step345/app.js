

var express = require('./lib/express');
/*express是个函数, express执行结果返回函数，return function(req,res){}*/
var app= express();

/*express执行结果返回的函数，有use 属性 ，该属性的值是个函数，
 且函数的参数不同

 app.use = function(fn)  fn 不同*/
 /*中间间 有next() */
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

app.use(function(req,res){
	res.send(404,'not found -_-');
})

module.exports = app;