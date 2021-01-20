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
router.get('/imgur', function (req, res, next) {
  //console.log(tweet);
  if (tweet) {

    console.log(tweet_code);
    //console.log('We using ' + tweet[0]);
    var text = get_random_word(tweet[0]);
    //console.log('Rand: ' + text);
    var image_link = imgur.get_images(text);
    my_json = {};

    image_link.then(value => {
      if (typeof value === 'undefined') {
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

router.get('/twitter', function (req, res, next) {
  //console.log('We made it to /logic/twitter');
  var tweet = twitter.get_tweets();
  //console.log(tweet);
  tweet.then((value) => {
    my_json = {};
    if (value == -1) {
      //there was an error
      //console.log('err');
      my_json.oembed_code = -1;
      res.json(my_json);
    }
    else {
      console.log('not err');
      var tweet_code = twitter.oembed_tweet_code(value);
      tweet_code.then(value => {
        //console.log(value);
        my_json.oembed_code = String(value);
        res.json(my_json);
      });
    }
  });
});



module.exports = router;
