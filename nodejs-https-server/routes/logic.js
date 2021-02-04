//logic.js handles the client's requests to the server(/imgur & /twitter). It then sends in the 
//response media or tweets.


var express = require('express');
var router = express.Router();
var imgur = require('../public/javascripts/imgur.js');
var twitter = require('../public/javascripts/twitter.js')
const { json } = require('express');

//This function gets a random word from the passed string(tweet).
//It returns the selected random word.
function get_random_word(tweet) {
  tweet = tweet.split(' ');
  //console.log(tweet);
  var index = Math.floor((Math.random() * (tweet.length - 1)) + 0);
  return tweet[index];
}

/* POST logic/imgur. */
//When this is requested the sent data, tweet text, gets a random word chosen from it.
//The word is then used to get a media link from Imgur. The link is then sent in the
//response. If there was an error a hardcoded media link is included in the response.
router.post('/imgur', function (req, res, next) {
  //console.log(req.body);
  var tweet = req.body.text;
  //console.log(tweet);
  var word = get_random_word(tweet);
  //console.log('Rand word is: ' + word);
  var image_link = imgur.get_images(word);
  my_json = {};
  image_link.then(value => {
    if (typeof value === 'undefined') {
      value = "https://i.imgur.com/pYdnX5g.gif";
    }
    my_json.image = String(value);
    res.json(my_json);
  });
});

/* GET logic/twitter. */
//When this is called a tweet is received from the dummy twitter account.
//If successful the tweet's oembed HTML code is also gotten. 
//In the response the tweet's text and oembed HTML code is included.
//If there is an error -1 is sent in the response.
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
