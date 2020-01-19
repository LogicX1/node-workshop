const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const message = ' Me is happy me is doing workshop ';


function handler (request , response) {
    var endpoint = request.url;
    console.log(endpoint);
    var method = request.method;
    console.log(method);
    var allTheData='';
  
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

    }else if (endpoint === '/create-post'){
        request.on('data',(chunkOfData) =>allTheData+=chunkOfData);
    
        request.on('end',()=>{
            response.writeHead(301,{"Location":'/'});
            let convertedData = querystring.parse(allTheData);
            console.log(allTheData);
            response.end();
        });

    }else{
        var extension = endpoint.split('.')[1];
        var extensionType = {
            html:'text/html',
            css:'text/css',
            js:'application/javascript',
            ico:'image/x-icon',
            jpg:'image/x-icon',
            png:'image/x-icon' 
        }
        
        const filePath = path.join(__dirname ,'/public/',endpoint)
        console.log(filePath)
        fs.readFile(filePath,(error,file)=> {
            if(error){
                console.log(error);
                response.writeHead(500);
                response.end('Cant handle this!')
            }else {

                response.writeHead(200,{'Content-Type':extensionType[extension]});
                response.end(file);
            }
            
        }); 
    }

   
}

// response.writeHead(404,{'Content-Type':'text/html'});
//     response.write('Not Found!');
//     response.end();







var server = http.createServer(handler);

server.listen(5050 , () => {
    console.log('Server is listening on port 5050,armed and ready!');

});