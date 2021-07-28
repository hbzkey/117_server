const systemParameterService = require('../application/systemParameterService');
const userService = require('../application/userService');

var getAllSystemParameter = async (ctx, next) => {
    let user_id = ctx.request.body.user_id
    let systemParameters = ''
    let identity = ''
    await userService.getUserById(user_id)
    .then(function(data){
        identity = data[0].identity;
    })

    if(identity == 'administrator'){
        await systemParameterService.getAllSystemParameter()
        .then(function(data){
            console.log('getAllSystemParameter');
            console.log(identity)
            console.log(data);
            systemParameters = data
        })
        .catch(function(err){
            console.log('catch:'+err);
        })
    }else{
        await systemParameterService.getUserSystemParameterByUserId(user_id)
        .then(function(data){
            console.log('getAllSystemParameter');
            console.log(identity)
            console.log(data);
            systemParameters = data
        })
        .catch(function(err){
            console.log('catch:'+err);
        })
    }
    

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'systemParameters': systemParameters
    };
}


var updateAllSystemParameter = async (ctx, next) => {
    let user_id = ctx.request.body.user_id
    let systemParameters = ctx.request.body.systemParameters
    // name parameter description extend_json
    // 签到距离 签到经验 出勤等级和出勤率
    
    state = ''
    let identity = ''
    await userService.getUserById(user_id)
    .then(function(data){
        identity = data[0].identity;
    })

    if(identity == 'administrator'){
        await systemParameterService.deleteAllSystemParameter()  
        .then(function(data){
            console.log('deleteAllSystemParameter')
            return systemParameterService.insertAllSystemParameter(systemParameters); 
        })
        .then(function(data){
            console.log('insertAllSystemParameter')
            state = data;
        })
        .catch(function(err){
            console.log('catch:'+err);
        })
    }else{
        for(let i=0;i<systemParameters.length;i++){
            delete systemParameters[i].extend_json;
            systemParameters[i].user_id = user_id;
        }
        await systemParameterService.insertOrUpdateUserSystemParameter(systemParameters)
        .then(function(data){
            console.log('insertAllSystemParameter')
            state = data;
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
}



module.exports = {
    'POST /api/getAllSystemParameter': getAllSystemParameter,
    'POST /api/updateAllSystemParameter': updateAllSystemParameter,
};
