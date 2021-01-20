const xhttp = new XMLHttpRequest();



function get_response(){
    if (!xhttp) {
        console.log('Failed creating XMLHttp instance.');
        return false;
    }
    xhttp.onreadystatechange = function() {
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            console.log(this.response);
            var tweet_text = JSON.parse(this.response);
            tweet_text = tweet_text.tweet;
            get_imgur_response(tweet_text);
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
            console.log(this.response);
        }
        else if(this.readyState == XMLHttpRequest.DONE && this.status != 200){
            console.log('Imgur Response, status: ' + this.status);
        }
    }
    var my_json = {};
    my_json.text = data;
    xhttp.open('POST', 'logic/imgur');
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(my_json));
}




function show_response(data){
    
    data = JSON.parse(data);
    console.log(data.tweet);
    console.log(data.image);
    console.log(data);
    document.getElementsByClassName('tweet')[0].innerHTML = data.oembed;
    document.getElementsByClassName('image')[0].innerHTML = data.image;
    
}
