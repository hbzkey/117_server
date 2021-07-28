const classService = require('../application/classService');
const userService = require('../application/userService');
// const QRious = require('qrious');

// 教师创建的班课
var getClassByUserId = async(ctx, next) => {
    let user_id = ctx.request.body.user_id;

    let classes = '';
    await classService.getClassByUserId(user_id)
        .then(function(data) {
            console.log('success:' + data);
            classes = data;
        })
        .catch(function(err) {
            console.log('catch:' + err);
        })


    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'classes': classes
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
var createClass = async(ctx, next) => {
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
    for (let length = 7; length < 50; length++) {
        // 每种班课号长度尝试50次
        for (let i = 0; i < 50; i++) {
            classData.class_number = getRandomCode(length);
            await classService.getClassByClassNumber(classData.class_number)
                .then(function(data) {
                    console.log('getClassByClassNumber')
                    console.log(data)
                    if (data.length == 0) {
                        var fs = require('fs');
                        fs.writeFile('static/images/class_image/' + classData.class_number + '.txt', classData.class_image, function(error) {
                            if (error) {
                                console.log('写入失败', error)
                            } else {
                                console.log('写入成功', error)
                            }
                        });

                        // let class_qrcode = new QRious({
                        //     // value:'https://github.com/neocotic/qrious'
                        //     value: classData.class_number
                        // });
                        // classData.class_qrcode = class_qrcode.toDataURL();
                        fs.writeFile('static/images/class_qrcode/' + classData.class_number + '.txt', classData.class_qrcode, function(error) {
                            if (error) {
                                console.log('写入失败', error)
                            } else {
                                console.log('写入成功', error)
                            }
                        });
                        classService.insertClass(classData)
                            .then(function(data) {
                                classData.id = data.id;
                            })
                        state = true;
                    }
                });
            if (state == true)
                break;
        }
        if (state == true)
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


// 查看班课详情
var getClassById = async(ctx, next) => {
    let class_id = ctx.request.body.class_id;

    let classData = '';
    await classService.getClassById(class_id)
        .then(function(data) {
            console.log('success:' + data);
            classData = data[0];

            var fs = require('fs');
            fs.readFile('static/images/class_image/' + classData.class_number + '.txt', function(error, data) {
                if (error) {
                    console.log('读取失败', error)
                } else {
                    console.log('读取成功', error)
                    classData.class_image = data;
                }
            });
            fs.readFile('static/images/class_qrcode/' + classData.class_number + '.txt', function(error, data) {
                if (error) {
                    console.log('读取失败', error)
                } else {
                    console.log('读取成功', error)
                    classData.class_qrcode = data;
                }
            });
        })
        .catch(function(err) {
            console.log('catch:' + err);
        })


    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'classData': classData
    };
};


//修改班课
var updateClass = async(ctx, next) => {
    let classData = ctx.request.body.classData;

    state = '';
    var fs = require('fs');
    fs.writeFile('static/images/class_image/' + classData.class_number + '.txt', classData.class_image, function(error) {
        if (error) {
            console.log('写入失败', error)
        } else {
            console.log('写入成功', error)
        }
    });
    fs.writeFile('static/images/class_qrcode/' + classData.class_number + '.txt', classData.class_qrcode, function(error) {
        if (error) {
            console.log('写入失败', error)
        } else {
            console.log('写入成功', error)
        }
    });

    await classService.updateClass(classData)
        .then(function(data) {
            console.log(data);
            state = data;
        })


    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'state': state
    };
};

// 删除班课
var deleteClass = async(ctx, next) => {
    let class_id = ctx.request.body.class_id;

    state = ''
    await classService.deleteClassById(class_id)
        .then(function(data) {
            console.log(data);
            return classService.deleteUserClassByClassId(class_id);
        })
        .then(function(data) {
            console.log(data);
            state = data
        })
        .catch(function(err) {
            console.log('catch:' + err);
        })

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'state': state
    };
}

// 查看班课成员
var getUserClassByClassId = async(ctx, next) => {
    let class_id = ctx.request.body.class_id;

    let userClass = '';
    let users = [];
    await classService.getUserClassByClassId(class_id)
        .then(function(data) {
            console.log(data);
            userClass = data;
        })
        .catch(function(err) {
            console.log('catch:' + err);
        })

    // 根据user_id获取用户
    for (let i = 0; i < userClass.length; i++) {
        await userService.getUserById(userClass[i].user_id)
            .then(function(data) {
                users.push(data[0]);
            })
    }

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'users': users
    };
};


// 学生加入的班课
var getUserClassByUserId = async(ctx, next) => {
    let user_id = ctx.request.body.user_id;
    // let user_id = 23;

    let userClass = '';
    let classes = [];
    await classService.getUserClassByUserId(user_id)
        .then(function(data) {
            console.log('success:' + data);
            userClass = data;
        })
        .catch(function(err) {
            console.log('catch:' + err);
        })

    for (let i = 0; i < userClass.length; i++) {
        await classService.getClassById(userClass[i].class_id)
            .then(function(data) {
                classes.push(data[0]);
            })
    }

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'classes': classes
    };
};

// 用班课号搜索班课
var getClassByClassNumber = async(ctx, next) => {
    let class_number = ctx.request.body.class_number;
    let user_id = ctx.request.body.user_id;

    let classData = '';
    let state = '';
    await classService.getClassByClassNumber(class_number)
        .then(function(data) {
            console.log('success:' + data);
            if (data.length != 0) {
                classData = data[0];
            }
        })
        .catch(function(err) {
            console.log('catch:' + err);
        })

    if (classData == '') {
        //班课号不存在
        state = -1;
    } else {
        var fs = require('fs');
        fs.readFile('static/images/class_image/' + classData.class_number + '.txt', function(error, data) {
            if (error) {
                console.log('读取失败', error)
            } else {
                console.log('读取成功', error)
                classData.class_image = data;
            }
        });
        fs.readFile('static/images/class_qrcode/' + classData.class_number + '.txt', function(error, data) {
            if (error) {
                console.log('读取失败', error)
            } else {
                console.log('读取成功', error)
                classData.class_qrcode = data;
            }
        });

        await classService.getUserClassByUserIdAndClassId(user_id, classData.id)
            .then(function(data) {
                console.log(data);
                if (data.length != 0) {
                    //已加入班课
                    state = -2;
                } else {
                    state = classData.id;
                }
            })
            .catch(function(err) {
                console.log('catch:' + err);
            })

    }

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'classData': classData,
        'state': state,
    };
};
// 加入班课
var joinClass = async(ctx, next) => {
    let user_id = ctx.request.body.user_id;
    let class_id = ctx.request.body.class_id;
    let class_number = ctx.request.body.class_number;

    let classData = '';
    let state = '';
    await classService.getClassByClassNumber(class_number)
        .then(function(data) {
            console.log(data);
            classData = data;
        })
        .catch(function(err) {
            console.log('catch:' + err);
        })

    if (classData.length == 0) {
        //班课号不存在
        state = -1;
    } else {
        await classService.getUserClassByUserIdAndClassId(user_id, classData[0].id)
            .then(function(data) {
                console.log(data);
                if (data.length != 0) {
                    //已加入班课
                    state = -2;
                } else {
                    state = classData[0].id,
                        classService.insertUserClass(user_id, classData[0].id);
                }
            })
            .catch(function(err) {
                console.log('catch:' + err);
            })

    }




    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'class_id': state,
    };
};
//退出班课
var exitClass = async(ctx, next) => {
    let user_id = ctx.request.body.user_id;
    let class_id = ctx.request.body.class_id;


    let state = '';
    await classService.deleteUserClassByUserIdAndClassId(user_id, class_id)
        .then(function(data) {
            console.log(data);
            state = data;
        })
        .catch(function(err) {
            console.log('catch:' + err);
        })


    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'state': state,
    };
};



module.exports = {
    'POST /api/getClassByUserId': getClassByUserId,
    'POST /api/createClass': createClass,
    'POST /api/getClassById': getClassById,
    'POST /api/updateClass': updateClass,
    'POST /api/deleteClass': deleteClass,
    'POST /api/getUserClassByClassId': getUserClassByClassId,
    'POST /api/getUserClassByUserId': getUserClassByUserId,
    'POST /api/getClassByClassNumber': getClassByClassNumber,
    'POST /api/joinClass': joinClass,
    'POST /api/exitClass': exitClass,
};