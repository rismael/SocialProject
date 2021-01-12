- To make server key and certificate run the following command
	openssl req -nodes -new -x509 -keyout server.key -out server.cert

- Running the server
	* Switch to the 'nodejs-https-server' directory
	* Use command 'nodemon index.js'

- Accessing the webapp
	* Type 'https://localhost:3000' in your web browser