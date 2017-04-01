var express = require('express');
var router = express.Router();
var path = require('path');

router.use(express.static(__dirname+'/public'));

router.get('/',function(req,res){
    res.sendFile(__dirname+'/public/html/index.html');
});

router.get('/weather',function(req,res){
    res.render('weather',{});
});

module.exports = router;