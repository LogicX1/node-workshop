const {handleHomeRoute,handleNode,handlePublic} = require('./handlers.js')
const querystring=require('querystring');

const router = (request, response) => {
  const endpoint = request.url;
  if(request.method=='GET'){
  if (endpoint === "/") {
    handleHomeRoute(request,response);
  }else if(endpoint === "/node"){
    handleNode(request,response)
  }
   else /*if(endpoint.indexOf('/public/') !== -1 )*/{  
      console.log('handling public requests ...');
       handlePublic(request,response);

  }
}else{
    let allTheData="";
    request.on("data", chunkOfData => (allTheData += chunkOfData));

    request.on("end", () => {
      response.writeHead(301, { Location: "/node" });
      let convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.end();
    });
}
}
module.exports = router;