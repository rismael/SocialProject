//XMLHttpRequest is used in the client side to make Requests to the server
var xhttp = new XMLHttpRequest();   
console.log('imgur.js is Running');
window.onload = make_request();

function make_request() {
    if (!xhttp) {
        console.log('Failed creating XMLHttp instance.');
        return false;
    }
    xhttp.onreadystatechange = function() {
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            console.log('Success! ' + this.status);


            /*
            console.log(this.response);
            let str = JSON.parse(this.response);
            console.log(str.data.bio);
            */
        }
    }
    xhttp.open('GET', 'https://api.imgur.com/3/account/robotaimg', true);
    xhttp.setRequestHeader('Authorization', 'Client-ID');
    xhttp.setRequestHeader('Accept', 'application/json');
    xhttp.send();
}