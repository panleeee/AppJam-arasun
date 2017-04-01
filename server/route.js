var express = require('express');
var router = express.Router();

router.use(express.static(__dirname+'/public'));

router.get('/',function(req,res){
    res.sendFile(__dirname+'/public/html/index.html');
});

module.exports = router;