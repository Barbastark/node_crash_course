/*****************************
 * **** Creating a server ****
 * ***************************
 * 
 * - In node.js, a server has to be created manually.
 * 
 * **********************************
 * **** Localhost & Port Numbers ****
 * **********************************
 * 
 * - Localhost is like a domain name.
 * 
 * - Leads to a special type of ip address
 *   referred to as a loop-back ip address.  
 * 
 * - A loop-back ip points directly back at 
 *   to your own computer.
 * 
 * - This address is 127.0.0.1
 * 
 * - a port number represents a specific channel, gateway or port
 *   on the computer that a certain software or server can communicate
 *   thru.
 * 
 * - A common port number used for local web development is 3000.
 * 
 * - Any port number can be used as long the port isn't used by 
 *   another software.
 *
 * **************************
 * **** HTP Status Codes ****
 * **************************
 * 
 * 100 Range - Informational responses
 * 
 * 200 Range - Successful responses
 * 
 * 300 Range - Redirects
 * 
 * 400 Range - User or client errer codes
 * 
 * 500 Range - Server error codes
 *  
 */

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  /**
   * This callback runs every time a new request is coming in.
   *
   * The req object contains loads of information about the incoming request.
   *
   * The response object is used to send a response to the user. 
   */
  let path = "./views/";
  
  res.setHeader("Content-type", "text/html");
  
  switch (req.url) {
    case "/":
      path += "index.html";
      // You can see the status code in the netwoork tab
      res.statusCode = 200; 
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;

    /*********************
     * **** Redirects ****
     * *******************
     * - If a resource is moved or renamed, all links created by
     *   users and other web sites to that resource will break.
     *  */ 

    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";  
      res.statusCode = 404;
  }


  fs.readFile(path, (err,data) => {
    if(err) {
      console.error(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
  
  console.log("Request incoming haha!!")
});

server.listen(3001, "localhost", () => {
  console.log("Server is listening on port 3000");
});