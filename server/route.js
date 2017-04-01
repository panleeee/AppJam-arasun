var express = require('express');
var path = require('path');
var request = require('request');
var router = express.Router();
var urlencode = require('urlencode');
var bodyParser = require('body-parser');

var resData = {};

router.use(express.static(__dirname + '/public'));

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/html/index.html');
});

router.get('/weather', function (req, res) {
    res.render('weather', {});
});

router.post('/searchCity', function (req, res) {
    var sl_adress = req.body.city;
    sl_adress = urlencode(sl_adress);
    var clientKey = 'B1wPHsGSGA';
    var ad_options = {
        url: 'https://openapi.naver.com/v1/map/geocode?encoding=utf-8&coordType=latlng&query='+sl_adress,
        host: 'openapi.naver.com',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-Naver-Client-Id': 'TTWUuECzU4KaBo1_FIrH',
            'X-Naver-Client-Secret': 'B1wPHsGSGA'
        }
    }

    function sl_callback(error, response, body) {
        if (!error && response.statusCode === 200) {
            var sl = JSON.parse(body);
            res.send(sl);
        } else {
            res.send('faild');
        }
    }

    request(ad_options, sl_callback);
});

router.post('/sendGPSInfo', function (req, res) {
    var location = {
        lon: req.body.lng,
        lat: req.body.lat,
    }
    var cu_options = {
        url: 'http://apis.skplanetx.com/weather/windex/thindex?version=1&lat=' + location.lat + '&lon=' + location.lon,
        headers: {
            "x-skpop-userId": 'sukjinjjang',
            "Accept-Language": 'ko_KR',
            "Date": 'Sun Apr 02 04:36:57 KST 2017',
            "Accept": 'application/json',
            "access_token": "",
            "appKey": '7359eecc-7508-39a8-a9b8-fb4dfadb22d2'
        }
    }
    //날씨 qpi 블러오기 및 실행
    var wh_options = {
        url: 'http://apis.skplanetx.com/weather/current/hourly?lon=' + location.lon + '&village=' + location.village + '&county=' + location.county + '&lat=' + location.lat + '&city=' + location.city + '&version=1',
        headers: {
            "x-skpop-userId": 'sukjinjjang',
            "Accept-Language": 'ko_KR',
            "Date": 'Sun Apr 02 04:36:57 KST 2017',
            "Accept": 'application/json',
            "access_token": "",
            "appKey": '7359eecc-7508-39a8-a9b8-fb4dfadb22d2'
        }
    }

    var pm_options = {
        url: 'http://apis.skplanetx.com/weather/dust?version=1&lat=' + location.lat + '&lon=' + location.lon,
        headers: {
            "x-skpop-userId": 'sukjinjjang',
            "Accept-Language": 'ko_KR',
            "Date": 'Sun Apr 02 04:36:57 KST 2017',
            "Accept": 'application/json',
            "access_token": "",
            "appKey": '7359eecc-7508-39a8-a9b8-fb4dfadb22d2'
        }
    }

    function wh_callback(error, response, body) {
        if (!error && response.statusCode === 200) {
            var weatherdata = response.body;
            weatherdata = JSON.parse(response.body);
            console.log(weatherdata.weather.hourly[0]);
            resData.weatherdata = weatherdata;
        } else {
            console.log(error + " , " + response.statusCode);
        }
    }

    function cu_callback(err, res, body) {
        if (!err && res.statusCode === 200) {
            var cudata = JSON.parse(res.body);
            current = cudata.weather.wIndex.thIndex[0].current.index;
            console.log('불쾌지수' + current);
            resData.angry = current;
        } else {
            console.log('current : ' + err);
        }
    }


    function pm_callback(err, res, body) {
        if (!err && res.statusCode === 200) {
            var pmdata = JSON.parse(res.body);
            dust = pmdata.weather.dust[0].pm10.value;
            console.log('미세먼지' + dust);
            resData.dust = dust;
        } else {
            console.log('dust : ' + err);
        }
    }

    request(cu_options, cu_callback);
    request(wh_options, wh_callback);
    request(pm_options, pm_callback);

    res.send(resData);
});

router.post('/searchCity',function(req,res){
    var sl_adress=req.body.city;
  sl_adress=urlencode(sl_adress);
  var clientKey='B1wPHsGSGA';
  var ad_options={
    url : 'https://openapi.naver.com/v1/map/geocode?encoding=utf-8&coordType=latlng&query='+sl_adress,
    host: 'openapi.naver.com',
    headers :{
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'X-Naver-Client-Id': 'TTWUuECzU4KaBo1_FIrH',
    'X-Naver-Client-Secret': 'B1wPHsGSGA'
    }
  }
  function sl_callback(err,response,body){
    if(!error&& response.statusCode===200){
      var sl=JSON.parse(body);

      var sl=response.body;
      console.log(sl);
      res.send(sl);

    } else {
      console.log('naver_address_select : '+err);
    }
  }

  request(ad_options, sl_callback);
});

module.exports = router;