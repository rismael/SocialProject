//XMLHttpRequest is used in the client side to make Requests to the server
var xhttp = new XMLHttpRequest();   
console.log('AJAX is running');
//When the site is loaded the Javascript does as well. When it loads we have the functions make_request() 
//and get_ig_code() run.
window.onload = make_request();
window.onload = get_ig_code();


//Prepares and Sends a GET request to igAuth to create the Instagram access link.
//Which would then give us the users access token.
function make_request() {
    if (!xhttp) {
        console.log('Failed creating XMLHttp instance.');
        return false;
    }
    xhttp.onreadystatechange = update_ig_auth_link;
    xhttp.open('GET', 'igAuth', true);
    xhttp.send();
}

//Once the user allows access to Instagram the redirect URL will contain the Instagram Code.
//The function gets the code from the URL and sends it to send_post_request().
function get_ig_code() {
    const queryString = window.location.search;
    //console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('code')) {
        var code = urlParams.get('code');
        console.log(code);
        code = { code : code};
        send_post_request(code);
    }
}

//With the acquired Instagram Code we create a POST request to igAuth.
//The function creates the POST request and sends it to the server.
function send_post_request(data) {
    if (!xhttp) {
        console.log('Failed creating XMLHttp instance.');
        return false;
    }
    xhttp.onreadystatechange = check_response_status;
    xhttp.open('POST', 'igAuth', true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
}

//From the sent POST request we check for the response to ensure it processed 
//properly by the server.
function check_response_status() {
    try {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            if (xhttp.status == 200) {
                console.log('POST: OK');
                console.log(xhttp.statusText);
            }
            else {
                console.log(xhttp.statusText);
            }
        }
    }
    catch (e) {
        console.log('Caught exception: ' + e.description);
    }
}

//If the GET request is successful the server sends the created link and applies it to the
//href of the 'Instagram Access' link. 
function update_ig_auth_link() {
    try {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            if (xhttp.status == 200) {
                console.log(xhttp.response);
                document.getElementsByClassName("ig-auth-link")[0].href = xhttp.responseText;
            }
            else {
                console.log('Problem with the igAuth GET Request');
            }
        }
    }
    catch (e) {
        console.log('Caught exception: ' + e.description);
    }
}
