var express = require('express');
var router = express.Router();
var imgur = require('../public/javascripts/imgur.js');
var twitter = require('../public/javascripts/twitter.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Client ID');
  twitter.get_tweets();
});

module.exports = router;
