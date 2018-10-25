
var parseBody = function(req,res,next){
   var body='';
   req.on('data',function(chunk){
   	body+=chunk;
   }).on('end',function(){
   	req.body=bodyParse(body);
  
   })
    next();
}

function bodyParse(body){
  var obj={};
  body.split('&').forEach(function(str){

        obj[str.split('=')[0]]=str.split('=')[1];
  })
  return obj;
}


module.exports = parseBody;