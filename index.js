console.log('Does this work? Yes! Running...')
var Twit = require('twit');

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
        console.log(data[i].full_text);
        //console.log('\n')
    }
}



console.log('Stopping...');