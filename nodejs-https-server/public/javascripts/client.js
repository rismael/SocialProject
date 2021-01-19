const xhttp = new XMLHttpRequest();



function get_response(){
    if (!xhttp) {
        console.log('Failed creating XMLHttp instance.');
        return false;
    }
    xhttp.onreadystatechange = function() {
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            //console.log(this.response);
            show_response(this.response);
        }
        else if(this.readyState == XMLHttpRequest.DONE && this.status != 200){
            console.log('what');
        }
    }
    xhttp.open('GET', 'imgur');
    xhttp.send();
}

function show_response(data){
    
    data = JSON.parse(data);
    console.log(data.tweet);
    console.log(data.image);
    console.log(data);
    document.getElementsByClassName('tweet')[0].innerHTML = data.oembed;
    document.getElementsByClassName('image')[0].innerHTML = data.image;
    
}
