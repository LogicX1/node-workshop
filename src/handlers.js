const fs = require("fs");
const path = require("path");
const querystring = require("querystring");


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

const  getPosts = (request,response) => {
    const postsPath = path.join(__dirname,'..', "src/posts.json");
    
    fs.readFile(postsPath,(error,file)=>{
        if(error){
            console.log(error);
            response.writeHead(500);
        response.end("ah fuck we got shit on by an error");
        }else {
            
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(file);
        }

    });


};

const createPost= (request,response)=>{
    console.log("We got a post request!");
    const postsPath = path.join(__dirname,'..', "src/posts.json");
    var allTheData = "";
    request.on("data", chunkOfData => (allTheData += chunkOfData));

    request.on("end", () => {
      var convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      var newPost = {};
      newPost[new Date().valueOf()]=convertedData.post;
      console.log(newPost);




      fs.readFile(postsPath,(error,file)=>{
        if(error){
            console.log(error);
            return;
        }else {
            var currentPosts = JSON.parse(file);
            currentPosts[new Date().valueOf()]=convertedData.post;
            fs.writeFile(postsPath,JSON.stringify(currentPosts),(error)=>{
                if(error){
                  response.end('fuck this shit im out')
                }else {
                  response.end('sucess');
                }
            });
        }
    });
    
      response.writeHead(301, { Location: "/" });
      response.end();
    

});
}
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
    handleNode,
    getPosts,
    createPost
}
