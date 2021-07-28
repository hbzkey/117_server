

module.exports = {};

/**
 * 查询全部和计数
 * @param {{name: 'joy'}} where 
 * @param {['name', 'DESC']} order 
 */
function findAndCountAll(model,where,order) {
    model.findAndCountAll({  //count  findAll  findOne
        where: where,
        // attributes:["id", "name"],    //  需要查询出的字段   attributes:{exclude: ['id'] },剔除不想要的属性
        order: order,  //排序 ['name', 'DESC']  ascent
        raw:true  // 查询结果sequelize模型转成数组
    }).then(function(result) {
        console.log(result)
    }).catch(function(error) {
        console.log(error)
    });
};
module.exports['findAndCountAll'] = findAndCountAll;

// function findAll() {};


/**
 * 分页查询
 * @param {{name: 'joy'}} where 
 * @param {['name', 'DESC']} order 
 * @param {0 / num} limit 
 * @param {0 / num} offset 
 */
function findAndCountAllPaging(model,where,order,limit,offset) {
    model.findAndCountAll({  //count  findAll  findOne
        where: where,
        // attributes:["id", "name"],    //  需要查询出的字段   attributes:{exclude: ['id'] },剔除不想要的属性
        order: order,  //排序 ['name', 'DESC']  ascent
        limit: limit,  //分页查找条数
        offset: offset,   //分页查找第几条开始
        raw:true  // 查询结果sequelize模型转成数组
    }).then(function(result) {
        console.log(result)
    }).catch(function(error) {
        console.log(error)
    });
};
module.exports['findAndCountAllPaging'] = findAndCountAllPaging;

/**
 * 计数
 * @param {{name: 'joy'}} where 
 */
function count(model,where) {
    model.count({  //count  findAll  findOne
        where: where,
        raw:true  // 查询结果sequelize模型转成数组
    }).then(function(result) {
        console.log(result)
    }).catch(function(error) {
        console.log(error)
    });
};
module.exports['count'] = count;

/**
 * 查询一条
 * @param {{name: 'joy'}} where 
 */
function findOne(model,where) {
    model.findOne({  //count  findAll  findOne
        where: where,
        // attributes:["id", "name"],    //  需要查询出的字段   attributes:{exclude: ['id'] },剔除不想要的属性
        raw:true  // 查询结果sequelize模型转成数组
    }).then(function(result) {
        console.log(result)
    }).catch(function(error) {
        console.log(error)
    });
};
module.exports['findOne'] = findOne;

function create(model,user) {
    model.create({
        name: user.name,
        sex: user.sex,
        birthday: user.birthday,
        phone: user.phone,
       // email: user.email,
        identity: user.identity,
        shcool_id: user.shcool_id,
        faculty_id: user.faculty_id,
        major_id: user.major_id,
        user_name: user.user_name,
        head_image: user.head_image,
        experience: user.experience
    }).then(function(result) {
        console.log(result)
    }).catch(function(error) {
        console.log(error)
    });
};
module.exports['create'] = create;

/**
 * 
 * @param {{experience:105}} data 
 * @param {*} where 
 */
function update(model,data,where) {
    model.update(
        data,
        {where:where}
    ).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
};
module.exports['update'] = update;

function destroy(model,id) {
    model.destroy({
        where: {
            id: id
        }
    }).then(function(result) {
        console.log(result)
    }).catch(function(error) {
        console.log(error)
    });
};
module.exports['destroy'] = destroy;