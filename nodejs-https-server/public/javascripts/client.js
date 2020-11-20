var xhttp = new XMLHttpRequest();
console.log('AJAX is running');
window.onload = make_request();
window.onload = get_ig_code();


function make_request() {
    if (!xhttp) {
        console.log('Failed creating XMLHttp instance.');
        return false;
    }
    xhttp.onreadystatechange = update_ig_auth_link;
    xhttp.open('GET', 'igAuth', true);
    xhttp.send();
}

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
function update_ig_auth_link() {
    try {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            if (xhttp.status == 200) {
                //console.log(xhttp.response);
                document.getElementsByClassName("ig-auth-link")[0].href = xhttp.responseText;
            }
            else {
                console.log('Problem with the Request');
            }
        }
    }
    catch (e) {
        console.log('Caught exception: ' + e.description);
    }
}
