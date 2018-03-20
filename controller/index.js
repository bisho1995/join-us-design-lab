var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
  data = {
    title: 'Join us you are not alone',
    date: '20/08/2018'
  }
  res.render('index', data);
});

module.exports = router;
