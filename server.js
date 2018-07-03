'use strict';

const http = require('http');

const Router = require('./Router');

const port = process.env.PORT || process.argv[2] || 9000;

let routesList = ['/index'];
let router = new Router(routesList);

http.createServer(function (req, res) {    
    router.tradeRoute(req.url, req, res);
}).listen(parseInt(port), () => console.log('Server running at ', port));

