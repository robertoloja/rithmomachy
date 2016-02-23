http = require('http');
fs = require('fs');

function send404Response(response) {
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("Woops, don't got.");
	response.end();
}

function onRequest(request, response) {
	if (request.method == 'GET' && request.url == '/') {
		response.writeHead(200, {"Content-Type": "text/html"});
		fs.createReadStream("./index.html").pipe(response);
	} else {
		send404Response(response);
	}
}

http.createServer(onRequest).listen(8000);
console.log("Server running.");
