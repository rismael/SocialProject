var express = require('express');
var router = express.Router();
var imgur = require('../public/javascripts/imgur.js');
var twitter = require('../public/javascripts/twitter.js')
var fs = require('fs');
const { json } = require('express');

function get_random_word(tweet) {
  tweet = tweet.split(' ');
  //console.log(tweet);
  var index = Math.floor((Math.random() * (tweet.length - 1)) + 0);
  return tweet[index];
}

/* GET home page. */
router.get('/', function (req, res, next) {
  twitter.get_tweets();
  var tweet;
  //console.log('Tweets received');
  tweet = fs.readFileSync('tweets.json', 'utf-8');
  tweet = JSON.parse(tweet);
  //console.log(tweet);
  if (tweet) {
    var tweet_code = twitter.oembed_tweet_code(tweet[1]);
    console.log(tweet_code);
    //console.log('We using ' + tweet[0]);
    var text = get_random_word(tweet[0]);
    //console.log('Rand: ' + text);
    var image_link = imgur.get_images(text);
    my_json = {};

    image_link.then(value => {
      if(typeof value === 'undefined'){
        value = "https://imgur.com/gallery/pYdnX5g";
      }
      my_json.tweet = String(tweet[0]);
      my_json.image = String(value);
    });
    tweet_code.then(value => {
      my_json.oembed = String(value);
      res.json(my_json);
    });
    
    //console.log('Img link ' + image_link);
    //es.send(text + ' : ' + image_link);
  }
  else {
    res.statusCode(500);
    return;
  }




});

module.exports = router;
