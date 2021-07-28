const model = require('../infrastructure/model');


function getClassById(id) {
    return new Promise(function(resolve, reject) {
        let Class = model.class;
        Class.findAll({ //count  findAll  findOne
            where: {
                id: id
            },
            order: [], //排序
            raw: true, // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });

};

function getClassByClassNumber(class_number) {
    return new Promise(function(resolve, reject) {
        let Class = model.class;
        Class.findAll({ //count  findAll  findOne
            where: {
                class_number: class_number
            },
            order: [], //排序
            raw: true, // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });

};
// 教师创建的班课
function getClassByUserId(user_id) {
    return new Promise(function(resolve, reject) {
        let Class = model.class;
        Class.findAll({ //count  findAll  findOne
            where: {
                user_id: user_id
            },
            order: [], //排序
            raw: true, // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });

};
// 学生加入的班课
function getUserClassByUserId(user_id) {
    return new Promise(function(resolve, reject) {
        let User_class = model.user_class;
        User_class.findAll({ //count  findAll  findOne
            where: {
                user_id: user_id
            },
            order: [],
            raw: true,
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};

function getUserClassByClassId(class_id) {
    return new Promise(function(resolve, reject) {
        let User_class = model.user_class;
        User_class.findAll({ //count  findAll  findOne
            where: {
                class_id: class_id
            },
            order: [],
            raw: true,
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};

function getUserClassByUserIdAndClassId(user_id, class_id) {
    return new Promise(function(resolve, reject) {
        let User_class = model.user_class;
        User_class.findAll({ //count  findAll  findOne
            where: {
                user_id: user_id,
                class_id: class_id
            },
            order: [],
            raw: true,
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};


function insertClass(classData) {
    return new Promise(function(resolve, reject) {
        let Class = model.class;
        Class.create({
            class_number: classData.class_number,
            name: classData.name,
            course: classData.course,
            semester: classData.semester,
            user_id: classData.user_id,
            //school_id: classData.school_id,
            faculty_id: classData.faculty_id,
            major_id: classData.major_id,
            is_school_plan: classData.is_school_plan,
            extend_json: classData.extend_json
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });

    });
};

function insertUserClass(user_id, class_id) {
    return new Promise(function(resolve, reject) {
        let User_class = model.user_class;
        User_class.create({
            user_id: user_id,
            class_id: class_id,
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });

    });
};

function updateClass(classData) {
    return new Promise(function(resolve, reject) {
        let Class = model.class;
        Class.update({
            name: classData.name,
            course: classData.course,
            semester: classData.semester,
            //school_id: classData.school_id,
            faculty_id: classData.faculty_id,
            major_id: classData.major_id,
            is_school_plan: classData.is_school_plan,
        }, {
            where: {
                id: classData.id,
            }
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });

    });
};

function deleteClassById(class_id) {
    return new Promise(function(resolve, reject) {
        let Class = model.class;
        Class.destroy({
            where: {
                id: class_id
            }
        }).then(function(result) {
            resolve(result)
        }).catch(function(error) {
            console.log(error)
        });
    });
};

function deleteUserClassByClassId(class_id) {
    return new Promise(function(resolve, reject) {
        let User_class = model.user_class;
        User_class.destroy({
            where: {
                class_id: class_id
            }
        }).then(function(result) {
            resolve(result)
        }).catch(function(error) {
            console.log(error)
        });
    });
};

function deleteUserClassByUserIdAndClassId(user_id, class_id) {
    return new Promise(function(resolve, reject) {
        let User_class = model.user_class;
        User_class.destroy({
            where: {
                user_id: user_id,
                class_id: class_id
            }
        }).then(function(result) {
            resolve(result)
        }).catch(function(error) {
            console.log(error)
        });
    });
};

module.exports = {
    'getClassById': getClassById,
    'getClassByClassNumber': getClassByClassNumber,
    'getClassByUserId': getClassByUserId,
    'getUserClassByUserId': getUserClassByUserId,
    'getUserClassByClassId': getUserClassByClassId,
    'getUserClassByUserIdAndClassId': getUserClassByUserIdAndClassId,
    'insertClass': insertClass,
    'insertUserClass': insertUserClass,
    'updateClass': updateClass,
    'deleteClassById': deleteClassById,
    'deleteUserClassByClassId': deleteUserClassByClassId,
    'deleteUserClassByUserIdAndClassId': deleteUserClassByUserIdAndClassId
};