const fs = require('fs');
const Sequelize = require('sequelize');
const config = require('./config');
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    dialectOptions: {
      useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: function (field, next) { // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
          return next()
        },
    },
    //timezone: '-02:00'
});

var path = require('path');
let modelsPath = path.join(__dirname, 'models');
let files = fs.readdirSync(modelsPath);


let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = sequelize.import(path.join(modelsPath, f));
    // module.exports[name].sync({alter: true }); // 若数据库表不存在，则创建
}
console.log(`model.js  **************`);

// 使用model：require('./model')  let User = model.user;


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