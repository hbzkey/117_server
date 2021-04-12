const loginService = require('../application/loginService');
const userService = require('../application/userService');
const systemParameterService = require('../application/systemParameterService');
const roleService = require('../application/roleService');
var login = async (ctx, next) => {
    let way = ctx.request.body.way;
    let account = ctx.request.body.account;
    let password = ctx.request.body.password;

    user_id = '';
    if(way == 'phone'){
        await loginService.getLoginByPhone(account)
        .then(function(data){
            console.log('phone login success:');
            console.log(data);
            if(data.length == 0){
                // account error
                user_id = -1
            }else if(data[0].phone_password != password){
                // password error
                user_id = -2
            }else{
                user_id =  data[0].user_id;
            }
        })
        .catch(function(err){
            console.log('catch:'+err);
        })
    }
    
    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'user_id': user_id
    };
};


var sinup = async (ctx, next) => {
    let phone = ctx.request.body.phone;
    let phone_password = ctx.request.body.phone_password;
    let create_time = ctx.request.body.create_time;
    user_id = '';
    
    // 初始化默认参数
    // 初始化默认角色，以后用户改变身份时，若角色被管理员改动过，则不改变角色，若没被管理员改动过，则改变角色


    await loginService.getLoginByPhone(phone)
    .then(function(data){
        console.log(data);
        if(data.length != 0){
            // phone already exist
            console.log('phone already exist');
            user_id = -1
        }
    })
    .catch(function(err){
        console.log('catch:'+err);
    })
    if(user_id == ''){
        await userService.insertUser(phone)
        .then(function(data){
            console.log(data);
            return loginService.insertLogin(data.id,phone,phone_password,create_time);
        })
        .then(function(data){
            console.log(data);
            user_id = data.user_id;
            return systemParameterService.getAllSystemParameter();
        })
        .then(function(data){
            console.log(data);
            let userSystemParameter = data.rows;
            for(let i=0;i<userSystemParameter.length;i++){
                delete userSystemParameter[i].id;
                delete userSystemParameter[i].extend_json;
                userSystemParameter[i].user_id = user_id;
            }
            return systemParameterService.insertOrUpdateUserSystemParameter(userSystemParameter);
        })
        .then(function(data){
            return roleService.getRoleByName('teacher');
        })
        .then(function(data){
            console.log(data);
            return userService.insertUserRole(user_id, data[0].id, data[0].name);
        })
        .catch(function(err){
            console.log('catch:'+err);
        })
    }

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'user_id': user_id
    };
};
module.exports = {
    // 'GET /api/login': login,
    // 'GET /api/sinup': sinup,
    // 'GET /api/updateEmail': updateEmail,
    // 'GET /api/updateEmailPassword': updateEmailPassword,
    // 'GET /api/updatePhone': updatePhone,
    // 'GET /api/updatePhonePassword': updatePhonePassword,
    'POST /api/login': login,
    'POST /api/sinup': sinup,
 
   
};