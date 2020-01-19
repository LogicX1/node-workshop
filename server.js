var http = require('http');

var server = http.createServer();

server.listen(5050 , () => {
    console.log('Server is listening on port 5050,armed and ready!');

});