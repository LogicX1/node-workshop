var http = require('http');
var fs = require('fs');

var message = ' Me is happy me is doing workshop ';

function handler (request , response) {
    var endpoint = request.url;
    console.log(endpoint);
    var method = request.method;
    console.log(method);


    if(endpoint === '/'){
        response.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile(__dirname +'/public/index.html',(error,file)=> {
            if(error){
                console.log('Error!')
                return;
            }
            response.end(file);
        });
    }
    else if(endpoint === '/node'){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write('Welcome to node page');
        response.end();

    }else if (endpoint === '/girls'){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write('Welcome to girls page');
        response.end();

    }else{
    response.writeHead(404,{'Content-Type':'text/html'});
    response.write('Not Found!');
    response.end();
    }
}









var server = http.createServer(handler);

server.listen(5050 , () => {
    console.log('Server is listening on port 5050,armed and ready!');

});