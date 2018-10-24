#!/usr/bin/env node
var http = require('http');
var app = require('../app');
/* var server = http.createServer(function(req,res){}) */
/*app是个函数,且 app=function(req,res){}*/
var server = http.createServer(app);
server.listen(8080);
console.log('localhost:8080');