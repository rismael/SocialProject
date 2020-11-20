var config = require('../../keys/insta_config');
const querystring = require('querystring');
const axios = require('axios');
const FormData = require('form-data');
const { redirect_uri } = require('../../keys/insta_config');
var api_url = 'https://api.instagram.com/'

function makeAuthLink() {
    var link = api_url + 'oauth/authorize?' + querystring.stringify({ client_id: config.app_id, redirect_uri: config.redirect_uri, scope: 'user_profile,user_media', response_type: 'code' });
    link = querystring.unescape(link);
    //console.log(link);
    return link;
}

function createTokenRequest(code){
    console.log('Running create')
    var form = new FormData();
    console.log('1');
    form.append('app_id', config.app_id);
    form.append('app_secret', config.app_secret);
    form.append('grant_type', 'authorization_code');
    form.append('redirect_uri', config.redirect_uri);
    form.append('code', code);
    var data = { 
        'client_id' : config.app_id,
        'client_secret' : config.app_secret,
        'grant_type' : 'authorization_code',
        'redirect_uri' : config.redirect_uri,
        'code' : code    
    };

    axios
        .post(api_url + 'oauth/access_token', form)
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
    
    
    
    
    
    
    
    
    
    
    /*
    var options= {
        hostname: "api.instagram.com",
        port: 80,
        path: '/oauth/access_token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', d => {
          process.stdout.write(d)
        })
      })
      
      req.on('error', error => {
        console.error(error)
      })
      
      req.write(data)
      req.end()
      */


    /*
    console.log('Look ' + code);
    var urlparams = {
        host:  'api.instagram.com', //No need to include 'http://' or 'www.'
        port: 3000,
        path: '/oauth/access_token/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', //Specifying to the server that we are sending JSON 
        }
    };
    
    

                function SendRequest(data) {
                    function OnResponse(response) {
                        var data = '';
                        response.code
                        response.on('data', function(chunk) {
                            data += chunk; //Append each chunk of data received to this variable.
                        });
                        response.on('end', function() {
                            console.log(data); //Display the server's response, if any.
                        });
                    }
                
                    var request = http.request(urlparams, OnResponse); //Create a request object.
                
                    request.write(JSON.stringify(data)); //Send off the request.
                    request.end(); //End the request.
                }
                SendRequest("{testfield: 'Boop'");
                */
}


module.exports = {
    makeLink: makeAuthLink,
    getToken: createTokenRequest
}

createTokenRequest('AQCfc7kVx8XLkIpfV1EUeW-Stl0yeRaXnixY8g5K9KtrGtdIKF8EjG3mmfBdrQ2U9hHOTIzqz3WnXjKnYG5iCghpUBqRhjA5Tw8eWiquhCiG02NelFscXAwvo-TjLPPr3wPfKsRANxYwgpCdB1tfynANvWJiuSgh4XIFRy4Upz7ovsOLn9Wv8QNl0shZZ7fztNptult_y-izcZsdeLEKVeRCrbws72v9fULEmj4kNLh1DA');