console.log('Does this work? Yes! Running...')
var Twit = require('twit');
const fs = require('fs');

var config = require('./config');
var T = new Twit(config);

var params = { count: 3,
                "tweet_mode" : "extended"
            };

T.get('statuses/home_timeline', params, gotData);

function gotData(err, data, response)
{
    //console.log(data);
    for(var i = 0; i < data.length; i++)
    {
        var tweet;
        if(data[i].retweeted_status)
        {
            tweet = data[i].retweeted_status.full_text;
        }
        else
        {
            tweet = data[i].full_text;
        }

        console.log("- " + tweet);
        //fs.appendFileSync('output.txt', 'Untouched- ' + data[i].full_text + '\n', handleMe);
        fs.appendFileSync('output.txt', tweet + '\n', handleMe);
        function handleMe(err)
        {
            if(err) console.log('err');
        }
    }
}



console.log('Stopping...');