const fs = require('fs');

var path = require('path');
let repositoriesPath = path.join(__dirname, 'repositories');
let files = fs.readdirSync(repositoriesPath);


let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    console.log(`import repository from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(path.join(repositoriesPath, f));
}
console.log(`repository.js  **************`);