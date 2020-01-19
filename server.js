var http = require('http');


var message = ' Me is happy me is doing workshop ';

function handler (request , response) {
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write(message);
    response.end();
}









var server = http.createServer(handler);

server.listen(5050 , () => {
    console.log('Server is listening on port 5050,armed and ready!');

});