const { handleHomeRoute,handleNode,  getPosts,createPost, handlePublic } = require("./handlers.js");
const querystring = require("querystring");
/*if(endpoint.indexOf('/public/') !== -1 )*/ 
/* this one doesnt handle something that doesnt exist yet */
const router = (request, response) => {
  const endpoint = request.url;
    if (endpoint === "/") {
      handleHomeRoute(request, response);
    } else if (endpoint === "/node") {
        handleNode(request, response);
    }else if (endpoint === '/posts'){
        getPosts(request,response);
    } else if (endpoint ==='/create/post'){
        createPost(request,response);
    }else {
    //   console.log("handling public requests ...");
      handlePublic(request, response);
    } 
};
module.exports = router;
