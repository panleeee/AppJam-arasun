var express = require('express');
var router = express.Router();
var path = require('path');

router.use(express.static(__dirname+'/public'));
router.set('views', path.join(__dirname, 'views'));
router.set('view engine', 'ejs');


출처: http://bcho.tistory.com/887 [조대협의 블로그]
router.get('/',function(req,res){
    res.sendFile(__dirname+'/public/html/index.html');
});

router.get('/weather',function(req,res){
    res.render('weather',{});
});

module.exports = router;