const xhttp = new XMLHttpRequest();



function get_response(){
    if (!xhttp) {
        console.log('Failed creating XMLHttp instance.');
        return false;
    }
    xhttp.onreadystatechange = function() {
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            //console.log(this.response);
            var tweet = JSON.parse(this.response);
            //console.log('tweet ' + tweet);
            get_imgur_response(tweet.tweet);
            show_response(tweet);
            //show_response(this.response);
        }
        else if(this.readyState == XMLHttpRequest.DONE && this.status != 200){
            console.log('Twitter Response, status: ' + this.status);
        }
    }
    xhttp.open('GET', 'logic/twitter');
    xhttp.send();
}

function get_imgur_response(data){
    xhttp.onreadystatechange = function() {
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            //console.log(this.response);
            var image = JSON.parse(this.response);
            show_response(image);
        }
        else if(this.readyState == XMLHttpRequest.DONE && this.status != 200){
            console.log('Imgur Response, status: ' + this.status);
        }
    }
    console.log(data);
    var my_json = {};
    my_json.text = data;
    xhttp.open('POST', 'logic/imgur');
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(my_json));
}




function show_response(data){
    if(data.tweet){
        console.log('text found... ' + data.tweet);
        console.log(data.oembed_code);
        document.getElementById('tweet').innerHTML = data.oembed_code;
    }
    else if(data.image){
        console.log('imgur found... ' + data.image);
        if(is_video(data.image)){
            console.log('its a video!');
            document.getElementById('video').src = data.image;
        }
        else{
            document.getElementById('image').src = data.image;
        }
    }
    else{
        console.log('something went wrong :/');
        console.log(data);
    }
    twttr.widgets.load()
}

function is_video(link){
    str = String(link);
    if(str[str.length - 3] == 'm' && str[str.length - 2] == 'p' && str[str.length - 1] == '4'){
        return true;
    }
    return false;
}