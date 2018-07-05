const url = require('url');
const fs = require('fs');
const path = require('path');

const TemplateEngine = require('./TemplateEngine');
const mimeType = require('./mimetypes');
const Settings = require('./settings')('public');
const pathUrl = require('url');

class Router {
    constructor(routesList) {
        this.routesList = routesList;
    }

    //Refactor the mimetype method
    //Refactor the main route method

    tradeRoute(url, requestDealer, responseDealer, status = 200) {    
        const parsedUrl = pathUrl.parse(requestDealer.url);
        let pathname = path.join(__dirname, `${Settings.staticFolder}${parsedUrl.pathname}`);
        //Verify if the requested URL is for get static file
        let extension;
        if(parsedUrl.path.split('.')) {
            extension = parsedUrl.path.split('.');
            extension = extension[1];
        }
        //Verify the mimetype of the archive
        let mimetypeFound = false;
        if(extension) {
            mimetypeFound = Object.entries(mimeType).find(([key, value]) => key === `.${extension}`);            
            fs.exists(pathname, (exist) => {
                if(!exist) {
                  // if the file is not found, return 404
                  responseDealer.statusCode = 404;
                  responseDealer.end(`File ${pathname} not found!`);
                  return;
                }
                fs.readFile(pathname, function(err, data){
                  if(err){
                    responseDealer.statusCode = 500;
                    responseDealer.end(`Error getting the file: ${err}.`);
                  } else {
                    // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                    const ext = path.parse(pathname).ext;
                    // if the file is found, set Content-type and send data
                    responseDealer.setHeader('Content-type', mimeType[ext] || 'text/plain' );
                    responseDealer.end(data);
                  }
                });
            });
        } else {
            //Route configuration
            let routeFounded = this.routesList.find(r => r === url);            
            if(routeFounded) {
                let page = url.replace('/', '');
                responseDealer.writeHead(status, {"Content-Type": "text/html", "x-powered-by": 'Elements'});
                TemplateEngine.RenderPage(page).then(page =>{
                    responseDealer.write(page);    
                    responseDealer.end();
                }).catch(error => {
                    responseDealer.write(error);
                    responseDealer.end();
                });                        
            } else {
                responseDealer.writeHead(status, {"Content-Type": "text/html", "x-powered-by": 'Elements'});
                responseDealer.write('Não encontrado!');
                responseDealer.end();
            }
        }                      
    }
}

module.exports = Router;