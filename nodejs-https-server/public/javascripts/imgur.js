//imgur.js is handles the API calls to Imgur. It get media from Imgur and returns the link associated to it.
//Later the link is used in the front-end to put on the website.

console.log('imgur.js - Running');
var config = require('../../keys/imgur_credentials.js');
const axios = require('axios');

//get_images calls the imgur API to find media related to the tweet's randomly selected word.
//The API's response is the processed to find the media link. 
//The media link is then returned. If no media link was able to be found then nothing is returned.
const get_images = async (tweet) => {
    try {
        const res = await axios.get('https://api.imgur.com/3/gallery/search/viral/?q=' + tweet, {
            headers: {
                'Authorization': 'Client-ID ' + config.client_id
            }
        });
        //console.log('Success! ' + res.status);
        //console.log(res.data.data[0]);
        var data = res.data.data[0];
        if (data.type) {
            //do something
            //console.log('Found a type in the outer region');
            if (what_type(data.type) == 'image' || what_type(data.type) == 'video') {
                return data.link;
            }
        }
        else if (!data.type) {
            //look elsewhere
            //console.log('No type in the outer region');
            if (data.images[0].type) {
                //do somethign
                //console.log('Found type in the inner region');
                if (what_type(data.images[0].type) == 'image' || what_type(data.images[0].type) == 'video') {
                    return data.images[0].link;
                }
            }
            else {
                //doesnt exist
                //console.log('No type found in outer or inner region.');
                return;
            }

        }
        //console.log(temp.data[0]);
    } catch (err) {
        console.error(err);
    }
};

//what_type is used to determine if the media is an image or a video. 
//We want to make sure the media fits into those two categories.
//The media type is returned. If it fails nothing is returned.
function what_type(str) {
    if (str.includes('image')) {
        //console.log('image');
        return 'image';
    }
    else if (str.includes('video')) {
        //console.log('video');
        return 'video';
    }
    else {
        return;
    }
}

module.exports = { get_images };
