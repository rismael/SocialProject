//XMLHttpRequest is used in the client side to make Requests to the server   
console.log('imgur.js - Running');
var config = require('../../keys/imgur_credentials.js');
const axios = require('axios');


//Test function to test the Imgur API
/* function get_images() {
   if (!xhttp) {
       console.log('Failed creating XMLHttp instance.');
       return false;
   }
   xhttp.onreadystatechange = function() {
       if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
           console.log('Success! ' + this.status);


           
           console.log(this.response);
           let str = JSON.parse(this.response);
           console.log(str.data.bio);
           
       }
   }
   xhttp.open('GET', 'https://api.imgur.com/3/account/robotaimg', true);
   xhttp.setRequestHeader('Authorization', 'Client-ID' + config.client_id);
   xhttp.setRequestHeader('Accept', 'application/json');
   xhttp.send();
}
*/
const get_images = async (tweet) => {
    try {
        const res = await axios.get('https://api.imgur.com/3/gallery/search/viral/?q=' + tweet, {
            headers: {
                'Authorization': 'Client-ID ' + config.client_id
            }
        });
        //console.log('Success! ' + res.status);
        console.log(res.data.data[0]);
        var data = res.data.data[0];
        if(data.type){
            //do somethign
            console.log('Found a type in the outer region');
            if(what_type(data.type) == 'image' || what_type(data.type) == 'video'){
                return data.link;
            }
        }
        else if(!data.type){
            //look elsewhere
            console.log('No type in the outer region');
            if(data.images[0].type)
            {
                //do somethign
                console.log('Found type in the inner region');
                if(what_type(data.images[0].type) == 'image' || what_type(data.images[0].type) == 'video'){
                    return data.images[0].link;
                }
            }
            else{
                //doesnt exist
                console.log('No type found in outer or inner region.');
                return;
            }

        }
        //console.log(temp.data[0]);
    } catch (err) {
        console.error(err);
    }
};

 function what_type(str){
    if(str.includes('image')){
        console.log('image');
        return 'image';
    }
    else if(str.includes('video')){
        console.log('video');
        return 'video';
    }
    else{
        return;
    }
} 

module.exports = {get_images};

//get_images('After');
//https://api.imgur.com/3/gallery/search/{{sort}}/{{window}}/{{page}}?q=cats