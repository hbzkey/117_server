const model = require('../infrastructure/model');

function getAllRoles() {
    return new Promise(function(resolve,reject){
        let Role = model.role;
        Role.findAndCountAll({  //count  findAll  findOne
            order: [],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};

function getRoleById(id) {
    return new Promise(function(resolve,reject){
        let Role = model.role;
        Role.findAll({  //count  findAll  findOne
            where: {
                id: id
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
function getRoleByName(name) {
    return new Promise(function(resolve,reject){
        let Role = model.role;
        Role.findAll({  //count  findAll  findOne
            where: {
                name: name
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
function getRolePermissionByRoleId(role_id) {
    return new Promise(function(resolve,reject){
        let Role_permission = model.role_permission;
        Role_permission.findAll({  //count  findAll  findOne
            where: {
                role_id: role_id
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

function insertRole(name,create_time,creator) {
    return new Promise(function(resolve,reject){
        let Role = model.role;
        Role.create({
            name: name,
            create_time: create_time,
            creator: creator,
            is_delete: false,
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};
function insertRolePermission(pairs) {
    return new Promise(function(resolve,reject){
        let Role_permission = model.role_permission;
        Role_permission.bulkCreate(pairs)
        .then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};

function updateRole(id,name,update_time,updater) {
    return new Promise(function(resolve,reject){
        let Role = model.role;
        Role.update({
            name: name,
            update_time: update_time,
            updater: updater
        },{
            where:{
                id: id
            }
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};
function updateRolePermission(role_id,pairs) {
    return new Promise(function(resolve,reject){
        let Role_permission = model.role_permission;
        Role_permission.destroy({
            where: {
                role_id: role_id
            }
        }).then(function(result) {
            return Role_permission.bulkCreate(pairs)
        })
        .then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};


function deleteRoleByName(name) {
    return new Promise(function(resolve,reject){
        let Role = model.role;
        Role.destroy({
            where: {
                name: name
            }
        }).then(function(result) {
            resolve(result)
        }).catch(function(error) {
            console.log(error)
        });
    });
};
function deleteRolePermissionByRoleId(role_id) {
    return new Promise(function(resolve,reject){
        let Role_permission = model.role_permission;
        Role_permission.destroy({
            where: {
                role_id: role_id
            }
        }).then(function(result) {
            resolve(result)
        }).catch(function(error) {
            console.log(error)
        });
    });
};
function deleteAllRolePermission() {
    return new Promise(function(resolve,reject){
        let Role_permission = model.role_permission;
        Role_permission.destroy({ 
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

module.exports = {
    'getAllRoles': getAllRoles,
    'getRoleById': getRoleById,
    'getRoleByName': getRoleByName,
    'getRolePermissionByRoleId': getRolePermissionByRoleId,
    'insertRole': insertRole,
    'insertRolePermission': insertRolePermission,
    'updateRole': updateRole,
    'updateRolePermission': updateRolePermission,
    'deleteRoleByName': deleteRoleByName,
    'deleteRolePermissionByRoleId': deleteRolePermissionByRoleId,
    'deleteAllRolePermission': deleteAllRolePermission
};