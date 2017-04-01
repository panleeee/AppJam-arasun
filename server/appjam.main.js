var request = require("request");
var express= require('express');
var http=require('http');
var https=require('https');
var urlencode=require('urlencode');
var app=express();
var bodyParser = require('body-parser');
var sendGPSInfo = require('./sendGPSInfo');
var route = require('./route');

// var port=1222;
// var host='39.7.18.141';
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/sendGPSInfo',sendGPSInfo);
app.use('/',route);


//날씨 api 객체
var location = {
  lon : 127.065539,
  //126.9658000000,
  lat : 37.488333,
  //37.5714000000,
  city : "서울",
  county : "강남구",
  village : "개포동"
}

//날씨 qpi 블러오기 및 실행
var wh_options = {
  url : 'http://apis.skplanetx.com/weather/current/hourly?lon='+location.lon+'&village='+location.village+'&county='+location.county+'&lat='+location.lat+'&city='+location.city+'&version=1',
  headers: {
    "x-skpop-userId": 'gsw2205',
    "Accept-Language": 'ko_KR',
    "Date": 'Sat Apr 01 17:31:22 KST 2017',
    "Accept": 'application/json',
    "access_token": "",
    "appKey": 'f5f3633b-6c15-333e-8b59-671316371351'
  }
}

var weatherreqdata= {
  tmax : '',
  tmin : '',
  sinceOntime : ''
}

function wh_callback(error,res,body){
  if(!error&& res.statusCode===200){
    var weatherdata=res.body;
    weatherdata = JSON.parse(res.body);
    console.log(weatherdata.weather.hourly[0].precipitation.sinceOntime);
  } else {
    console.log('cant');
  }
}
request(wh_options, wh_callback);
//미세먼지 농도 체크
var pm10data='30';
var pm_options = {
  url : 'http://apis.skplanetx.com/weather/dust?version=1&lat='+location.lat+'&lon='+location.lon,
  headers: {
    "x-skpop-userId": 'gsw2205',
    "Accept-Language": 'ko_KR',
    "Date": 'Sat Apr 01 17:31:22 KST 2017',
    "Accept": 'application/json',
    "access_token": "",
    "appKey": 'f5f3633b-6c15-333e-8b59-671316371351'
  }
}

function pm_callback(error,res,body){
  if(!error&& res.statusCode===200){
    var pmdata=res.body;
    pmdata = JSON.parse(res.body);
    var dust=pmdata.weather.dust[0].pm10.grade;
  } else {
    console.log('cant');
  }
}
request(pm_options, pm_callback);

//서버실행
var server=app.listen(1222,function(){
  var host=server.address().address;
  var port=server.address().port;
  console.log(host+':'+port);
});
