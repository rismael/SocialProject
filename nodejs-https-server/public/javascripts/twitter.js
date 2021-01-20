
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

const axios = require('axios');
//parameters for the query
var params = {
    count: 1,
    "tweet_mode": "extended"
};
//We want to get User's timeline. Response is sent to the function response_handler
function get_tweets(){
    return T.get('statuses/home_timeline', params).then(value => {
        if(value.resp.statusCode == 200){
            //console.log(value.data[0]);
            var id_str;
            var text;
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
//response_handler processes the response and gets/displays the text of the tweets
function response_handler(err, data, response) {

    //console.log(data);
    //console.log(response.status);
    if(data.errors){
        process.stdout.write('twitter.js ERROR:');
        console.log(data);
    }
    else{
        var tweet_array = [];
        for (var i = 0; i < data.length; i++) {
            var tweet;
            //tweets that are Retweets need extra handling
            //console.log(data);
            if (data[i].retweeted_status) {
                tweet = data[i].retweeted_status.full_text;
            }
            else {
                tweet = data[i].full_text;
            }
            
            tweet_array[i] = tweet;
            tweet_array[i+1] = data[i].id_str;
            return tweet_array;
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
