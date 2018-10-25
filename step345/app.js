
var path = require('path');
var express = require('./lib/express');
/*step4 bodyParse 自己写的*/
/*var bodyParse = require('./lib/bodyParse');*/
/*step5 npm 包*/
var bodyParser = require('body-parser');
var mimeType = require('./lib/mime');


/*express是个函数, express执行结果返回函数，return function(req,res){}*/
var app= express();


/*express执行结果返回的函数，有use 属性 ，该属性的值是个函数，
 且函数的参数不同

 app.use = function(fn)  fn 不同*/
 /*中间间 有next() */

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);
/* step5 mime-type 包，用来设置content-type 根据pathname*********************/
/*mimeType 是个函数*/
app.use(mimeType); 


/* step4 2. 请求参数处理(处理 input 的数据) */
/*bodyParse 是函数 */
/*app.use(bodyParse);*/
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

/*step5 使用模板引擎*/
/*放模板文件的地址*/
app.set('view', path.join(__dirname, 'view'))
app.use('/about', function(req, res){
  res.render('about.html', {
    title: '自我介绍',
    img: 'https://ps.ssl.qhimg.com/sdmt/104_132_100/t0171a9f9b9f6db621c.webp',
    name: 'LLL',
    sex: 'female',
    hobby: 'Reading Running'
  })
})
/*app.use('/about', function(req, res){
  res.render('about.html', {
    title: 'Self-introduction',
    name: 'LLL',
    sex: 'female',
    hobby: 'Reading Running'
   
  })
})*/

app.use(function(req,res){
	res.send(404,'not found -_-');
})

module.exports = app;