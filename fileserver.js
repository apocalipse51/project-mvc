const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const Settings = require('./settings')('public');
// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = process.env.PORT || process.argv[2] || 9000;
const public = 'public';

http.createServer(function (req, res) {
  /*
  const parsedUrl = url.parse(req.url);
  let pathname = path.join(__dirname, `${public}${parsedUrl.pathname}`);
  const mimeType = {
    '.ico': 'image/x-icon',    
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  };
  fs.exists(pathname, (exist) => {
    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        const ext = path.parse(pathname).ext;
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });
  */
}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);