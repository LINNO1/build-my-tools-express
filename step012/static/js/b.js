
var xhr = new XMLHttpRequest()
xhr.open('GET', '/getWeather?city=hangzhou', true)
/*xhr.open('GET', '/search?username=hangzhou&password=111', true)*/
/*xhr.open('GET', '/a', true)*/
xhr.send()

xhr.onload = function(data){
  /*console.log(JSON.parse(xhr.responseText))*/
/*  console.log(JSON.parse(xhr.testRequest))*/

  console.log('data')
  alert(JSON.parse(data));

}