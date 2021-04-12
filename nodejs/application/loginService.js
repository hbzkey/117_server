const model = require('../infrastructure/model');
function getLoginByPhone(phone) {
    return new Promise(function(resolve,reject){
        let Login = model.login;
        Login.findAll({  //count  findAll  findOne
            where: {
                phone: phone
            },
            order: [],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};

function getLoginByUserId(user_id) {
    return new Promise(function(resolve,reject){
        let Login = model.login;
        Login.findAll({  //count  findAll  findOne
            where: {
                user_id: user_id
            },
            order: [],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};

function insertLogin(user_id,phone,phone_password) {
    return new Promise(function(resolve,reject){
        let Login = model.login;
        
        Login.create({
            user_id: user_id,
            phone: phone,
            phone_password: phone_password,
           // create_time: create_time
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};


function updateLoginPhone(user_id,phone,phone_password) {
    return new Promise(function(resolve,reject){
        let Login = model.login;
        Login.update({
            phone:phone,
            phone_password:phone_password
        },{
            where:{
                user_id: user_id
            }
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};

module.exports = {
    'getLoginByPhone': getLoginByPhone,
   
    'getLoginByUserId': getLoginByUserId,
    'insertLogin': insertLogin,
 
    'updateLoginPhone': updateLoginPhone
};
