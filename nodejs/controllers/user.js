const userService = require('../application/userService');
const roleService = require('../application/roleService');

var initializeUser = async (ctx, next) => {
  let user_id = ctx.request.body.user_id;
  let identity = ctx.request.body.identity;
  let name = ctx.request.body.name;
  let student_number = ctx.request.body.student_number;

  state = '';



  await userService.getUserById(user_id)
  .then(function(data){
      console.log(data[0]);
      let user = data[0];
      user.identity = identity;
      user.name = name;
      user.student_number = student_number;
      return userService.updateUser(user);
  })
  .then(function(data){
    state = data;
    if(identity == 'student'){
        roleService.getRoleByName('student')
        .then(function(data){
            userService.updateUserRole(user_id, data[0].id, data[0].name);
        })
    }
  })
  .catch(function(err){
      console.log('catch:'+err);
  })

  // 设置Content-Type:
  ctx.response.type = 'application/json';
  // 设置Response Body:
  ctx.response.body = {
      'state':state
  };
};

var getAllUsers = async (ctx, next) => {
  users = ''
  await userService.getAllUsers()
  .then(function(data){
      console.log('getAllUsers');
      console.log(data);
      users = data
  })
  .catch(function(err){
      console.log('catch:'+err);
  })

  // 设置Content-Type:
  ctx.response.type = 'application/json';
  // 设置Response Body:
  ctx.response.body = {
      'users': users
  };
}
var getUserById = async (ctx, next) => {
    let user_id = ctx.request.body.user_id;

    user = ''
    await userService.getUserById(user_id)
    .then(function(data){
        console.log(data);
        user = data
    })
    .catch(function(err){
        console.log('catch:'+err);
    })
  
    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'user': user
    };
  }



var getUserPermissions = async (ctx, next) => {
    let user_id = ctx.request.body.user_id;
    // let user_id = 14;

    permissions = []
    await userService.getUserRolesByUserId(user_id)
    .then(function(data){
        let userRoles = data.rows;
        return new Promise(function(resolve,reject){
            for(let i=0; i<userRoles.length;i++){
                roleService.getRolePermissionByRoleId(userRoles[i].role_id)
                .then(function(data){
                    let j=0;
                    for(; j<data.length;j++){
                        if(permissions.indexOf(data[j].permission_id)==-1){
                            permissions.push(data[j].permission_id);
                        }
                    }
                    if(j == data.length){
                        resolve(permissions)
                    }
                })
            }
        })
    })
    .then(function(data){
        console.log('data')
        console.log(data)
        console.log(permissions)
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
var getAllUserRoles = async (ctx, next) => {
  userRoles = ''
  await userService.getAllUserRoles()
  .then(function(data){
      console.log('getAllUsers');
      console.log(data);
      userRoles = data
  })
  .catch(function(err){
      console.log('catch:'+err);
  })

  // 设置Content-Type:
  ctx.response.type = 'application/json';
  // 设置Response Body:
  ctx.response.body = {
      'userRoles': userRoles
  };
}


var updateAllUserRole = async (ctx, next) => {
  //user_id  role_id  role_name
  let pairs = ctx.request.body.pairs;

  state = '';
  await userService.updateAllUserRole(pairs)
  .then(function(data){
      console.log(data);
      state = data;
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
};

//修改用户信息
var updateUser = async (ctx, next) => {
    let user = ctx.request.body.user;
    // let user = {
    //     name: 'aaa',
    //     sex: 'man',
    //     birthday: '2020-01-01 06:00:00',
    //     phone: '13123456789',
    //     email: '111222@qq.com',
    //     identity: 'teacher',
    //     student_number: '190327001',
    //     school_id: 1,
    //     faculty_id: 1,
    //     major_id: 1,
    //     school_name: '福州大学',
    //     faculty_name: '',
    //     major_name: '',
    //     user_name: 'aaaaa',
    //     head_image: '',  //dataUrl
    //     experience: 10, //总经验值
    // }

    //用户改变身份时，若角色被管理员改动过，则不改变角色，若没被管理员改动过，则改变角色
    let userRoles  = []
    let identity = ''
    // 数据库用户的角色
    await userService.getUserRolesByUserId(user.id)
    .then(function(data){
        userRoles = data.rows
        // 数据库用户的identity
        return userService.getUserById(user.id);
    })
    .then(function(data){
        identity = data[0].identity
        // 新的角色
        return roleService.getRoleByName(user.identity);
        
    })
    .then(function(data){
        if(userRoles.length == 1 && identity == userRoles[0].role_name){
            userService.updateUserRole(user.id,data[0].id,data[0].name)
        }
    })
    .catch(function(err){
        console.log('catch:'+err);
    })

    let state = '';
    await userService.updateUser(user)
    .then(function(data){
        console.log(data);
        state = data;
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
  };

module.exports = {
    'POST /api/initializeUser': initializeUser,
    'GET /api/getAllUsers': getAllUsers,
    'POST /api/getUserById': getUserById,
    'POST /api/getUserPermissions': getUserPermissions,
    'GET /api/getAllUserRoles': getAllUserRoles,
    'POST /api/updateAllUserRole': updateAllUserRole,
    'POST /api/updateUser': updateUser,
};