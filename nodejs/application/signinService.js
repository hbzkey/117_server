const model = require('../infrastructure/model');


function getSigninByClassId(class_id) {
    return new Promise(function(resolve,reject){
        let Signin = model.signin;
        Signin.findAll({  //count  findAll  findOne
            where: {
                class_id: class_id
            },
            order: [['create_time', 'DESC']],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};

function getOneSigninByClassId(class_id) {
    return new Promise(function(resolve,reject){
        let Signin = model.signin;
        Signin.findOne({  //count  findAll  findOne
            where: {
                class_id: class_id
            },
            order: [['create_time', 'DESC']],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};

function getExperienceLogByUserIdClassId(user_id, class_id) {
    return new Promise(function(resolve,reject){
        let Experience_log = model.experience_log;
        Experience_log.findAll({  //count  findAll  findOne
            where: {
                user_id: user_id,
                class_id: class_id,
                system_parameter_name: '签到经验'
            },
            order: [['time', 'DESC']],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};
function getOneExperienceLogByUserIdClassId(user_id, class_id) {
    return new Promise(function(resolve,reject){
        let Experience_log = model.experience_log;
        Experience_log.findOne({  //count  findAll  findOne
            where: {
                user_id: user_id,
                class_id: class_id,
                system_parameter_name: '签到经验'
            },
            order: [['time', 'DESC']],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};

function insertSignin(signin) {
    return new Promise(function(resolve,reject){
        let Signin = model.signin;
        Signin.create({
            class_id: signin.class_id,
            experience: signin.experience,
            create_time: signin.create_time,
            creator: signin.creator,
            distance: signin.distance,
            deadline: signin.deadline,
            longitude: signin.longitude,
            latitude: signin.latitude,
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};
function insertExperienceLog(class_id,user_id,experience,time) {
    return new Promise(function(resolve,reject){
        let Experience_log = model.experience_log;
        Experience_log.create({
            class_id: class_id,
            user_id: user_id,
            system_parameter_name: '签到经验',
            experience: experience,
            time: time,
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};

function updateSignin(sign_id,deadline) {
    return new Promise(function(resolve,reject){
        let Signin = model.signin;
        Signin.update({
            deadline: deadline,
        },{
            where:{
                id: sign_id,
            }
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};

module.exports = {
    'getSigninByClassId': getSigninByClassId,
    'getOneSigninByClassId': getOneSigninByClassId,
    'getExperienceLogByUserIdClassId': getExperienceLogByUserIdClassId,
    'getOneExperienceLogByUserIdClassId': getOneExperienceLogByUserIdClassId,
    'insertSignin': insertSignin,
    'insertExperienceLog': insertExperienceLog,
    'updateSignin': updateSignin,

};