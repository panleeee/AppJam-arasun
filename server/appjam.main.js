var request = require("request");
var express= require('express');
var http=require('http');
var https=require('https');
var urlencode=require('urlencode');
var app=express();
var bodyParser = require('body-parser');

// var port=1222;
// var host='39.7.18.141';
app.use(bodyParser.urlencoded({ extended: false }));




//네이버 주소 검색
// var sl_adress='개포동';
// sl_adress=urlencode(sl_adress);
// var clientKey='B1wPHsGSGA';
// var ad_options={
//   url : 'https://openapi.naver.com/v1/map/geocode?encoding=utf-8&coordType=latlng&query=%EB%B6%88%EC%A0%95%EB%A1%9C%206',
//   host: 'openapi.naver.com',
//   headers :{
//   'Accept': '*/*',
//   'Content-Type': 'application/json',
//   'X-Naver-Client-Id': 'TTWUuECzU4KaBo1_FIrH',
//   'X-Naver-Client-Secret': 'B1wPHsGSGA'
//   }
// }
// function sl_callback(error,res,body){
//   if(!error&& res.statusCode===200){
//     var sl=JSON.parse(body);
//
//     var sl=res.body;
//     console.log(sl);
//
//   } else {
//     console.log('faild');
//   }
// }
//
// request(ad_options, sl_callback);

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



//라우터
app.get('/',function(req,res){
  console.log('/ open');
  res.send(wealther);
});
app.post('/postGps',function(req,res){
  var lon = req.body.lon;
  var lat = req.body.lat;
  res.send(weatherdata);
});
//서버실행
var server=app.listen(1222,function(){
  var host=server.address().address;
  var port=server.address().port;
  console.log(host+':'+port);
});
