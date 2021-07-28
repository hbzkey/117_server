const schoolService = require('../application/schoolService');

var getAllSchoolFacultyMajor = async (ctx, next) => {
    let schools = []
    let faculties = []
    let majors = []
    await schoolService.getAllSchool()
    .then(function(data){
        // console.log(data);
        schools = data
        return schoolService.getAllFaculty()
    })
    .then(function(data){
        faculties = data
        return schoolService.getAllMajor()
    })
    .then(function(data){
        majors = data
    })
    .catch(function(err){
        console.log('catch:'+err);
    })

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'schools': schools,
        'faculties': faculties,
        'majors': majors
    };
}


var updateAllSchoolFacultyMajor = async (ctx, next) => {
    let schools = ctx.request.body.schools;
    
    state = ''
    await schoolService.deleteAllSchoolFacultyMajor()  
    .then(function(data){
        console.log('delete schools')
        
        for(let i=0;i<schools.length;i++){
            schoolService.inserSchool(schools[i])
            .then(function(data){
                console.log(data)
                for(let j=0;j<schools[i].children.length;j++){
                    schools[i].children[j].school_id = data.id;
                    schoolService.insertFaculty(schools[i].children[j])
                    .then(function(data){
                        console.log(data)
                        for(let k=0;k<schools[i].children[j].children.length;k++){
                            schools[i].children[j].children[k].faculty_id = data.id;
                            schoolService.insertMajor(schools[i].children[j].children[k])
                        }
                    })
                }
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
        'state': state
    };
}

module.exports = {
    'GET /api/getAllSchoolFacultyMajor': getAllSchoolFacultyMajor,
    'POST /api/updateAllSchoolFacultyMajor': updateAllSchoolFacultyMajor,
};
