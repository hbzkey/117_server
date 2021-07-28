const roleService = require('../application/roleService');

var getAllRoles = async (ctx, next) => {
    roles = ''
    await roleService.getAllRoles()
    .then(function(data){
        console.log('getAllRoles');
        console.log(data);
        roles = data
    })
    .catch(function(err){
        console.log('catch:'+err);
    })
    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'roles': roles
    };
}
var getRoleById = async (ctx, next) => {
    id = ctx.request.body.id;
    role = {}
    await roleService.getRoleById(id)
    .then(function(data){
        console.log(data);
        role = data[0];
    })
    .catch(function(err){
        console.log('catch:'+err);
    })

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'role': role
    };
}
var getRoleByName = async (ctx, next) => {
    name = ctx.request.body.name;
    role = {}
    await roleService.getRoleByName(name)
    .then(function(data){
        console.log(data);
        role = data[0];
        return roleService.getRolePermissionByRoleId(data[0].id);
    })
    .then(function(data){
        console.log(data);
        role.permissions = data;
    })
    .catch(function(err){
        console.log('catch:'+err);
    })

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'role': role
    };
}

var createRole = async (ctx, next) => {
    let id = ctx.request.body.id;
    let name = ctx.request.body.name;
    let create_time = ctx.request.body.create_time;
    let creator = ctx.request.body.creator;
    let permissions = ctx.request.body.permissions;
    let operation = ctx.request.body.operation;  // 1:新增  2:编辑

    state = '';
    await roleService.getRoleByName(name)
    .then(function(data){
        console.log(data);
        // 新增：若查找的nameid不存在（可创建），若查找的nameid存在（不可创建）
        // 编辑：若查找的nameid不存在（说明改了name,修改角色和删除id的角色权限，创建角色权限），
        //       若查找nameid存在（id与nameid一样，修改角色和删除id的角色权限，创建角色权限），
        //                      （id与nameid不一样，不可修改）；
        if(data.length != 0 && (operation==1 || operation==2 && data[0].id != id)){  
            // role already exist
            console.log('role already exist');
            state = -1;
        }
    })
    .catch(function(err){
        console.log('catch:'+err);
    })
    if(state == '' && operation==1){
        await roleService.insertRole(name,create_time,creator)
        .then(function(data){
            console.log(data);
            state = data;
            let pairs = [];
            for(let i=0;i<permissions.length;i++){
                pairs.push({
                    role_id: data.id,
                    permission_id: permissions[i].id
                })
            }
            return roleService.insertRolePermission(pairs);
        })
        .then(function(data){
            console.log(data);
        })
        .catch(function(err){
            console.log('catch:'+err);
        })
    }else if(state == '' && operation == 2){
        await roleService.updateRole(id,name,create_time,creator)
        .then(function(data){
            console.log(data);
            state = data;
            let pairs = [];
            for(let i=0;i<permissions.length;i++){
                pairs.push({
                    role_id: id,
                    permission_id: permissions[i].id
                })
            }
            return roleService.updateRolePermission(id,pairs);
        })
        .then(function(data){
            console.log(data);
        })
        .catch(function(err){
            console.log('catch:'+err);
        })
    }

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'state': state
    };
};




var deleteRole = async (ctx, next) => {
    name = ctx.request.body.name;

    state = ''
    await roleService.getRoleByName(name)
    .then(function(data){
        console.log(data);
        return roleService.deleteRolePermissionByRoleId(data[0].id);
    })
    .then(function(data){
        console.log(data);
        return roleService.deleteRoleByName(name);
    })
    .then(function(data){
        console.log(data);
        state = data
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
    'GET /api/getAllRoles': getAllRoles,
    'POST /api/getRoleById': getRoleById,
    'POST /api/getRoleByName': getRoleByName,
    'POST /api/createRole': createRole,
    'POST /api/deleteRole': deleteRole,
};
