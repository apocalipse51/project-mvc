const fs = require('fs');
const path = require('path');

class TemplateEngine {
    constructor() {}

    static RenderPage(pageName) {
        let pageDir = path.join(__dirname, `${pageName}.html`);        
        return new Promise((resolve, reject) => {
            fs.readFile(pageDir, (e, a) => {
                if(e) reject(e);
                resolve(a.toString());
            });
        });        
    }
}

module.exports = TemplateEngine;