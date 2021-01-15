
console.log('twitter.js - Running')
//This code uses 'twit' as the API Library simplifying the use of Twitter's API
var Twit = require('twit');
//fs is used for writing to files
const fs = require('fs');
const request = require('request');
//config file is used to access Tokens/Keys
var config = require('../../keys/twitter_credentials.js');
const { response } = require('express');
var T = new Twit(config);
//parameters for the query
var params = {
    count: 3,
    "tweet_mode": "extended"
};
//We want to get User's timeline. Response is sent to the function response_handler
function get_tweets(){
    T.get('statuses/home_timeline', params, response_handler);
}
//response_handler processes the response and gets/displays the text of the tweets
function response_handler(err, data, response) {

    //console.log(data);
    //console.log(response.status);
    if(data.errors){
        console.log(data.errors[1].message);
    }
    else{
        var tweet_array = [];
        for (var i = 0; i < data.length; i++) {
            var tweet;
            //tweets that are Retweets need extra handling
            if (data[i].retweeted_status) {
                tweet = data[i].retweeted_status.full_text;
            }
            else {
                tweet = data[i].full_text;
            }
            
            tweet_array[i] = tweet;
            //console.log(tweet_array[i]);

            //console.log("- " + tweet);
            //fs.appendFileSync('output.txt', 'Untouched- ' + data[i].full_text + '\n', handleMe);
            //fs.appendFileSync('output.txt', tweet + '\n', handleMe);
            //function handleMe(err)
            //{
            //    if (err) console.log(err);
            //}
        }
        var json_array = JSON.stringify(tweet_array);
        fs.writeFile('tweets.json', json_array, function(err, result){
            if(err){
                console.log('fs ', + err);
            }
        });
    }
    
    
}


module.exports = { get_tweets};
