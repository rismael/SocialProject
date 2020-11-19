var config = require('../../keys/insta_config');
const querystring = require('querystring');
var api_url = 'https://api.instagram.com/'


function makeAuthLink(){
    var link = api_url + 'oauth/authorize?' + querystring.stringify({client_id : config.app_id, redirect_uri : config.redirect_uri, scope : 'user_profile,user_media', response_type: 'code'});
    link = querystring.unescape(link);
    //console.log(link);
    return makeAuthLink;
}

module.exports = {
    insta_auth_link : makeAuthLink()
}