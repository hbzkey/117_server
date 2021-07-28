const model = require('../infrastructure/model');

function getAllSchool() {
    return new Promise(function(resolve,reject){
        let School = model.school;
        School.findAndCountAll({  //count  findAll  findOne
            order: ['name'],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};

function getAllFaculty() {
    return new Promise(function(resolve,reject){
        let Faculty = model.faculty;
        Faculty.findAndCountAll({  //count  findAll  findOne
            order: ['id'],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};
function getAllMajor() {
    return new Promise(function(resolve,reject){
        let Major = model.major;
        Major.findAndCountAll({  //count  findAll  findOne
            order: ['faculty_id'],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};


function deleteAllSchoolFacultyMajor() {
    return new Promise(function(resolve,reject){
        let School = model.school;
        let Faculty = model.faculty;
        let Major = model.major;
        School.destroy({ 
            where: {}, 
            truncate: true 
        }) 
        .then(function(result) {
            return Faculty.destroy({ 
                where: {}, 
                truncate: true 
            }) 
        })
        .then(function(result) {
            return Major.destroy({ 
                where: {}, 
                truncate: true 
            }) 
        })
        .then(function(result) {
            resolve(result);
        })
        .catch(function(error) {
            console.log(error)
        });
    
    });
};


function inserSchool(school) {
    return new Promise(function(resolve,reject){
        let School = model.school;
        School.create({
            name:school.name, 
            location:school.location, 
        })
        .then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};
function insertFaculty(faculty) {
    return new Promise(function(resolve,reject){
        let Faculty = model.faculty;
        Faculty.create({
            name:faculty.name, 
            school_id:faculty.school_id, 
        })
        .then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};
function insertMajor(major) {
    return new Promise(function(resolve,reject){
        let Major = model.major;
        Major.create({
            name:major.name, 
            faculty_id:major.faculty_id, 
        })
        .then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};


module.exports = {
    'getAllSchool': getAllSchool,
    'getAllFaculty': getAllFaculty,
    'getAllMajor': getAllMajor,
    'deleteAllSchoolFacultyMajor': deleteAllSchoolFacultyMajor,
    'inserSchool': inserSchool,
    'insertFaculty': insertFaculty,
    'insertMajor': insertMajor
};