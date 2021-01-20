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

/* POST logic/imgur. */
router.post('/imgur', function (req, res, next) {
  //console.log(req.body);
  var tweet = req.body.text;
  //console.log(tweet);
  var word = get_random_word(tweet);
  //console.log('Rand: ' + word);
  var image_link = imgur.get_images(word);
  my_json = {};
  image_link.then(value => {
    if (typeof value === 'undefined') {
      value = "https://imgur.com/gallery/pYdnX5g";
    }
    my_json.image = String(value);
    res.json(my_json);
  });
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
      my_json = value;
      res.json(my_json);
    }
    else {
      //console.log('not err');
      var tweet_code = twitter.oembed_tweet_code(value.id_str);
      tweet_code.then(code_value => {
        //console.log(value);
        my_json.oembed_code = String(code_value);
        my_json.tweet = String(value.text);
        res.json(my_json);
      });
    }
  });
});



module.exports = router;
