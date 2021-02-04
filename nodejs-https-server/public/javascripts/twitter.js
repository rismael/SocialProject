
//This file handles the requests/responses to the twitter API. Mainly getting the
//user's tweets and getting the oembed html of it.

console.log('twitter.js - Running')
//This code uses 'twit' as the API Library simplifying the use of Twitter's API
var Twit = require('twit');
//config file is used to access Tokens/Keys
var config = require('../../keys/twitter_credentials.js');
const { response } = require('express');
var T = new Twit(config);
const axios = require('axios');

//parameters for the query
var params = {
    count: 1,
    "tweet_mode": "extended"
};

//get_tweets() calls the twitter API and gets the first tweet in the user's timeline.
//The tweet's text and its ID is returned. If it fails a value of -1 is returned.
//NOTE: Twitter has a limit on how many requests can be sent to the API. The limit is 
//like 15 every few minutes. 
function get_tweets(){
    return T.get('statuses/home_timeline', params).then(value => {
        if(value.resp.statusCode == 200){
            //console.log(value.data[0]);
            var id_str;
            var text;
            //The if/else statement is needed as when the first tweet is a retweeted tweet
            //some extra manuevering is needed to get the full text.
            if (value.data[0].retweeted_status) {
                text = value.data[0].retweeted_status.full_text;
            }
            else {
                text = value.data[0].full_text;
            }
            id_str = value.data[0].id_str;
            return {text, id_str};
        }
        else{
            return -1;
        }
    })
    .catch(err => {
        console.log(err);
        return -1;
    })
    //console.log('Tweets Received');
}

//oembed_tweet_code is used to get the oembed html of the tweet. This will then allow for the tweet to be
//embedded in the website. It returns the oembed html.
const oembed_tweet_code = async (tweet_id) => {
    try {
        const res = await axios.get('https://publish.twitter.com/oembed?url=https://twitter.com/twitter/status/' + tweet_id);
        //console.log('Success! ' + res.status);
        //console.log(res.data.data[0].link);
        return res.data.html;
        //console.log(temp.data[0]);
    } catch (err) {
        console.error(err);
    }
};

module.exports = { get_tweets, oembed_tweet_code};
