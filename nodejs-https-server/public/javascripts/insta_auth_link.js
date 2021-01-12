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
    var data = { 
        'client_id' : config.app_id,
        'client_secret' : config.app_secret,
        'grant_type' : 'authorization_code',
        'redirect_uri' : config.redirect_uri,
        'code' : code    
    };
    
    axios
        .post(api_url + 'oauth/access_token', querystring.stringify(data))
        .then(res => {
            console.log(`***status: ${res.status}`)
            if(res.status != 200){
                console.log(res)
            }
        })
        .catch(error => {
            console.error(error)
        })
}


module.exports = {
    makeLink: makeAuthLink,
    getToken: createTokenRequest
}
