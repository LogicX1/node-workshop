const fs = require("fs");
const path = require("path");



const handleHomeRoute = (request, response) => {
  const indexPath = path.join(__dirname,'..', "/public/index.html");
  fs.readFile(indexPath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500);
      response.end("Unexpected error has occured");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    }
  });
};


const handleNode = (request,response)=>{
    response.end('<h1>node</h1>'); 
};


const handlePublic = (request, response) => {
    const endpoint = request.url;
  const extension = endpoint.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    jpg: "image/x-icon",
    png: "image/x-icon"
  };


    const filePath = path.join(__dirname,'..', "/public/", endpoint);
    console.log(filePath);
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        response.writeHead(500);
        response.end("Cant handle this!");
      } else {
        response.writeHead(200, { "Content-Type": extensionType[extension] });
        response.end(file);
      }
    });
  
};

module.exports = {
    handleHomeRoute,
    handlePublic,
    handleNode
}
