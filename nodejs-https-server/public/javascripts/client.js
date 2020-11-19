var xhttp = new XMLHttpRequest();
console.log('AJAX is running');
window.onload = make_request;

function make_request(){
    if(!xhttp) {
        console.log('Failed creating XMLHttp instance.');
        return false;
    }
    xhttp.onreadystatechange = update_ig_auth_link;
    xhttp.open('GET', 'igAuth', true);
    xhttp.send();
}

function update_ig_auth_link() {
    try{
        if(xhttp.readyState == XMLHttpRequest.DONE){
            if(xhttp.status == 200){
                //console.log(xhttp.response);
                document.getElementsByClassName("ig-auth-link")[0].href = xhttp.responseText;
            }
            else{
                console.log('Problem with the Request');
            }
        }
    }
    catch(e){
        console.log('Caught exception: ' + e.description);
    }
}
