const classService = require('../application/classService');
const userService = require('../application/userService');

var getClassByUserId = async (ctx, next) => {
    let user_id = ctx.request.body.user_id;
    
    let classes = '';
    await classService.getClassByUserId(user_id)
    .then(function(data){
        console.log('success:'+data);
        classes = data;
    })
    .catch(function(err){
        console.log('catch:'+err);
    })


    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'classes': classes
    };
};
var createClass = async (ctx, next) => {
    let classData = ctx.request.body.classData;

    // let classData = {
    //     // 'id': 5,
    //     // 'class_number': 'abcd0',
    //     // 'class_qrcode':'dataurl', //二维码DataURL保存到本地  命名class_number
    //     'class_image':'dataurl', // 图片DataURL保存到本地 命名class_number
    //     'name':'class1',
    //     'course':'course1',
    //     'semester':'1',
    //     'user_id':1,
    //     'school_id':1,
    //     'faculty_id':1,
    //     'major_id':1,
    //     'is_school_plan':true, 
    // }


    let state = false;
    // 若生成的班课号一直有，则增加长度
    for(let length = 7;length<50;length++){
        // 每种班课号长度尝试50次
        for(let i=0;i<50;i++){
            classData.class_number = getRandomCode(length);
            await classService.getClassByClassNumber(classData.class_number)
            .then(function(data){
                console.log('getClassByClassNumber')
                console.log(data)
                if(data.length==0){
                    var fs = require('fs');
                    fs.writeFile('static/images/class_image/'+classData.class_number+'.txt',classData.class_image,function(error){
                        if(error){
                            console.log('写入失败',error)
                        }else{
                            console.log('写入成功',error)
                        }
                    });

                    // let class_qrcode = new QRious({
                    //     // value:'https://github.com/neocotic/qrious'
                    //     value: classData.class_number
                    // });
                    // classData.class_qrcode = class_qrcode.toDataURL();
                    fs.writeFile('static/images/class_qrcode/'+classData.class_number+'.txt',classData.class_qrcode,function(error){
                        if(error){
                            console.log('写入失败',error)
                        }else{
                            console.log('写入成功',error)
                        }
                    });
                    classService.insertClass(classData)
                    .then(function(data){
                        classData.id = data.id;
                    })
                    state = true;
                }
            });
            if(state == true)
                break;
        }
        if(state == true)
                break;
    }
    
    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'class_id': classData.id,
        'class_number': classData.class_number,
        // 'classData': classData,
    };
};

// 创建班课 班课号 二维码
function getRandomCode(length) {
    if (length > 0) {
       var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
       var nums = "";
       for (var i = 0; i < length; i++) {
          var r = parseInt(Math.random() * 61);
          nums += data[r];
       }
       return nums;
    } else {
       return false;
    }
 }
module.exports = {
    'POST /api/getClassByUserId': getClassByUserId,
    
    'POST /api/createClass': createClass,
  
};