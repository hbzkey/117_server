const model = require('../infrastructure/model');


function getAllSystemParameter() {
    return new Promise(function(resolve,reject){
        let System_parameter = model.system_parameter;
        System_parameter.findAndCountAll({  //count  findAll  findOne
            order: [],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};

function getUserSystemParameterByUserId(user_id) {
    return new Promise(function(resolve,reject){
        let User_system_parameter = model.user_system_parameter;
        User_system_parameter.findAndCountAll({  //count  findAll  findOne
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


function deleteAllSystemParameter() {
    return new Promise(function(resolve,reject){
        let System_parameter = model.system_parameter;
        System_parameter.destroy({ 
            where: {}, 
            truncate: true 
        }) 
        .then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};
// function deleteUserSystemParameterByUserId(user_id) {
//     return new Promise(function(resolve,reject){
//         let User_system_parameter = model.user_system_parameter;
//         User_system_parameter.destroy({
//             where: {
//                 user_id: user_id
//             }
//         }) 
//         .then(function(result) {
//             resolve(result);
//         }).catch(function(error) {
//             console.log(error)
//         });
    
//     });
// };

function insertAllSystemParameter(systemParameters) {
    return new Promise(function(resolve,reject){
        let System_parameter = model.system_parameter;
        System_parameter.bulkCreate(systemParameters)
        .then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};
function insertOrUpdateUserSystemParameter(UserSystemParameters) { //updateOnDuplicate是在插入的时候如果主键冲突就执行更新操作
    return new Promise(function(resolve,reject){
        let User_system_parameter = model.user_system_parameter; // id user_id name parameter description
        User_system_parameter.bulkCreate(UserSystemParameters,{updateOnDuplicate:["parameter"]})
        .then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};

module.exports = {
    'getAllSystemParameter': getAllSystemParameter,
    'getUserSystemParameterByUserId': getUserSystemParameterByUserId,
    'deleteAllSystemParameter': deleteAllSystemParameter,
    'insertAllSystemParameter': insertAllSystemParameter,
    'insertOrUpdateUserSystemParameter': insertOrUpdateUserSystemParameter
};




