const permissionService = require('../application/permissionService');
const roleService = require('../application/roleService');

var getAllPermissions = async (ctx, next) => {
    permissions = ''
    await permissionService.getAllPermissions()
    .then(function(data){
        console.log('getAllPermissions');
        console.log(data);
        permissions = data
    })
    .catch(function(err){
        console.log('catch:'+err);
    })
    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'permissions': permissions
    };
}


var insertChildrenPermission = async (children,update_time,updater,parent_id, roles) => {
    if(!children){
        return false;
    }
    for(let i=0; i<children.length;i++){
        children[i].update_time = update_time;
        children[i].updater = updater;
        children[i].is_delete = false;
        children[i].parent_id = parent_id;
        children[i].sort = i+1;
        await permissionService.insertPermission(children[i])
        .then(function(data){
            let pairs = []
            for(let j=0;j<roles.length;j++){
                pairs.push({
                    role_id: roles[j].id,
                    permission_id: data.id
                })
            }
            roleService.insertRolePermission(pairs);
            insertChildrenPermission(children[i].children,update_time,updater,data.id,roles);
        })
        .catch(function(err){
            console.log('catch:'+err);
        })
    }
};
var updatePermissions = async (ctx, next) => {
    let permissions = ctx.request.body.permissions;
    let update_time = ctx.request.body.update_time;
    let updater = ctx.request.body.updater;

    // 不用重新设置角色
    // 查找所有权限，获取id排序，对permission获取id排序，对比id，
    // 查找id有，permission没：(删除) 删除权限表查找id，删除角色权限表的查找id
    // 查找id有，permission有：(修改) 修改权限表  parent_id sort ?
    // 查找id没，permission有：(新增) 插入权限表  parent_id sort ?

    // 需要重新设置角色
    // 在此设置所有角色有全部权限：查找所有角色，每一角色删除原权限，插入所有权限
    
    state = ''
    await permissionService.deletePermissions()  //清空权限
    .then(function(data){
        console.log('delete permissions')
        return roleService.deleteAllRolePermission(); //清空角色权限
    })
    .then(function(data){
        console.log('delete role_ermissions')
        return roleService.getAllRoles(); //获取所有角色
    })
    .then(function(data){
        console.log('getAllRoles')
        console.log(data.rows)
        insertChildrenPermission(permissions,update_time,updater,0, data.rows);
    })
    .catch(function(err){
        console.log('catch:'+err);
    })

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'state': state
    };
}



module.exports = {
    'GET /api/getAllPermissions': getAllPermissions,
    'POST /api/updatePermissions': updatePermissions,
};
