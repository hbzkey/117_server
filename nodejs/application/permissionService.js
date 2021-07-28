const model = require('../infrastructure/model');


function getAllPermissions() {
    return new Promise(function(resolve,reject){
        let Permission = model.permission;
        Permission.findAndCountAll({  //count  findAll  findOne
            order: ['parent_id','sort'],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};

function deletePermissions() {
    return new Promise(function(resolve,reject){
        let Permission = model.permission;
        Permission.destroy({
            where: {
                is_delete: false
            }
        })
        .then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};

function insertPermission(permission) {
    return new Promise(function(resolve,reject){
        let Permission = model.permission;
        Permission.create({
            parent_id:permission.parent_id, 
            sort:permission.sort, 
            name:permission.name, 
            url:permission.url, 
            icon:permission.icon, 
            is_menu:permission.is_menu, 
            is_page:permission.is_page, 
            is_button:permission.is_button, 
            description:permission.description, 
            create_time:permission.create_time, 
            creator:permission.creator, 
            update_time:permission.update_time, 
            updater:permission.updater, 
            is_delete:permission.is_delete, 
            extend_json:permission.extend_json
        })
        .then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};

module.exports = {
    'getAllPermissions': getAllPermissions,
    'deletePermissions': deletePermissions,
    'insertPermission': insertPermission
};




