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

// 使用repository：require('./repository)  let userRepository = repository.userRepository;


/*
// 递归读取目录下的所有文件 model文件
function readFileList(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    console.log(files);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {      
            readFileList(path.join(dir, item), filesList);  //递归读取文件
        } else {                
            filesList.push(fullPath);                     
        }        
    });
    return filesList;
}
var filesList = [];
readFileList(__dirname,filesList);
*/