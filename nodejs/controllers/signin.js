const signinService = require('../application/signinService');
const userService = require('../application/userService');

// 班课里教师发起的的签到
var getSigninByClassId = async(ctx, next) => {
    let class_id = ctx.request.body.class_id;

    let signins = '';
    await signinService.getSigninByClassId(class_id)
        .then(function(data) {
            console.log('success:' + data);
            signins = data;
        })
        .catch(function(err) {
            console.log('catch:' + err);
        })

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'signins': signins
    };
};

//学生在该班课参与的所有签到签到
var getExperienceLogByUserIdClassId = async(ctx, next) => {
    let user_id = ctx.request.body.user_id;
    let class_id = ctx.request.body.class_id;

    let signins = '';
    await signinService.getExperienceLogByUserIdClassId(user_id, class_id)
        .then(function(data) {
            console.log('success:' + data);
            signins = data;
        })
        .catch(function(err) {
            console.log('catch:' + err);
        })

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'signins': signins
    };
};

// 创建签到  位置经度纬度longitude latitude
var createSign = async(ctx, next) => {
    let signin = ctx.request.body.signin;
    // let signin = {
    //     class_id: 3,
    //     experience: 2,
    //     create_time: '2020-05-06 08:00:00',
    //     creator: 1,
    //     distance: 5,  // 5km
    //     deadline: '2020-05-06 08:10:00',
    //     longitude: 10,  //经度
    //     latitude: 20,  // 纬度  学生签到时也获取经纬度，计算是否在distance范围内
    // }

    let sign_id = '';
    await signinService.insertSignin(signin)
        .then(function(data) {
            console.log(data);
            sign_id = data.id;
        })
        .catch(function(err) {
            console.log('catch:' + err);
        })

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'sign_id': sign_id
    };
};

// 提前结束签到 update
var updateSignin = async(ctx, next) => {
    let sign_id = ctx.request.body.sign_id;
    let deadline = ctx.request.body.deadline;

    state = '';
    await signinService.updateSignin(sign_id, deadline)
        .then(function(data) {
            console.log(data);
            state = data;
        })
        .catch(function(err) {
            console.log('catch:' + err);
        })

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'state': state
    };
};

// 参与签到
var joinSignin = async(ctx, next) => {
    let user_id = ctx.request.body.user_id;
    let class_id = ctx.request.body.class_id;
    let signin_time = ctx.request.body.signin_time;
    let longitude = ctx.request.body.longitude;
    let latitude = ctx.request.body.latitude;

    // 查看最新签到是否过期，若还没过期，查看学生最新签到是否已签到
    let signin = ''; // create_time deadline experience longitude latitude distance
    let state = '';
    await signinService.getSigninByClassId(class_id)
        .then(function(data) {
            console.log(data);
            signin = data;
        })
        .catch(function(err) {
            console.log('catch:' + err);
        })


    signin_time_format = signin_time.replace('T', ' ')
    console.log(signin_time_format);
    signin_time_format = signin_time.replace('Z', '')
    console.log(signin_time_format);

    if (signin.length == 0) {
        // 尚无发起签到 
        state = -1;
    } else if (new Date(signin[0].deadline).getTime() < new Date(signin_time_format).getTime()) {
        // 签到过期
        state = -2;
    } else if (signin[0].distance && (signin[0].distance * signin[0].distance) <
        ((signin[0].latitude - latitude) * (signin[0].latitude - latitude) +
            (signin[0].longitude - longitude) * (signin[0].longitude - longitude))) {
        // 超出签到范围  若不限距离，创建签到时distance为null
        state = -3;
    } else {
        await signinService.getExperienceLogByUserIdClassId(user_id, class_id)
            .then(function(data) {
                if (data.length != 0 && new Date(signin[0].create_time).getTime() < new Date(data[0].time).getTime()) {
                    //已签到
                    state = -4;
                } else {
                    signinService.insertExperienceLog(class_id, user_id, signin[0].experience, signin_time);
                    state = 1;
                }
            })
            .catch(function(err) {
                console.log('catch:' + err);
            })

    }


    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'state': state,
    };
};


module.exports = {
    'POST /api/getSigninByClassId': getSigninByClassId,
    'POST /api/getExperienceLogByUserIdClassId': getExperienceLogByUserIdClassId,
    'POST /api/createSign': createSign,
    'POST /api/updateSignin': updateSignin,
    'POST /api/joinSignin': joinSignin,
};