- To make server key and certificate run the following command
	openssl req -nodes -new -x509 -keyout server.key -out server.cert

- Running the server
	* Switch to the 'nodejs-https-server' directory
	* Use command 'nodemon index.js' or 'npm start'

- Accessing the webapp
	* Type 'https://localhost:3000' in your web browser
	
NOTE: A Twitter Devloper and Imgur Developer accounts are needed. To make it work put in your developer account info in the local keys directory in the project. Create 2 files: twitter_credentials.js and imgur_credentials.js. The imgur credentials file should look as so
module.exports = {
    client_id : '<YOUR ID>'
}

and the twitter credentials file should look like this
module.exports = {
    consumer_key:         '<THE SPECIFIED TOKEN>',
    consumer_secret:      '<THE SPECIFIED TOKEN>',
    access_token:         '<THE SPECIFIED TOKEN>',
    access_token_secret:  '<THE SPECIFIED TOKEN>'
}
Once that has been done the website should work accordingly.
