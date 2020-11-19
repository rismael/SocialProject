var xhttp = new XMLHttpRequest();
console.log('AJAX is running');


function make_request(){
    if(!xhttp) {
        console.log('Failed creating XMLHttp instance.');
        return false;
    }
    xhttp.onreadystatechange = update_ig_auth_link;
    xhttp.open('GET', 'users');
    xhttp.send();
}

function update_ig_auth_link() {
    try{
        if(xhttp.readyState == XMLHttpRequest.DONE){
            if(xhttp.status == 200){
                alert('Time to modify href >:)');
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