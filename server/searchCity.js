var express = require('express');
var request = require('request');
var router = express.Router();

router.post('/', function (req, res) {
    var sl_adress =  req.body.city;
    sl_adress = urlencode(sl_adress);
    var clientKey = 'B1wPHsGSGA';
    var ad_options = {
        url: 'https://openapi.naver.com/v1/map/geocode?encoding=utf-8&coordType=latlng&query=%EB%B6%88%EC%A0%95%EB%A1%9C%206',
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

module.exports = router;