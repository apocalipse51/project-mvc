'use strict';

const http = require('http');
const colors = require('colors');
//Test with URL parser
const urlParser = require('url');

const Router = require('./Router');

const port = process.env.PORT || process.argv[2] || 9000;

//let routesList = ['/index'];
let routesList = [
    {
        method: "GET",
        path: "/",
        view: "index"
    },
    {
        method: "GET",
        path: "/index",
        view: "index"
    },
    {
        method: "GET",
        path: "/home",
        view: "index"
    }
];

let router = new Router(routesList);

const server = http.createServer();

server.on('request', (request, response) => {
    const { method, url } = request;    
    let parser = new RouteParser();   
    parser.GetRoute(urlParser.parse(url));  
    let pathFind = routesList.find(r => (r.path === url && r.method === method));        
    response.end();
});

function RouteParser() {    
    this.GetRoute = (url) => {
        const { pathname } = url;
        let splited = pathname.split('/');
        let controller = splited[1];
        let action = splited[2];
        console.log({controller, action});
    };
}

server.listen(port, () => console.log(`Server running at ${port} port.`));