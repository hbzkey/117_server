/*
// 连接数据库
const Sequelize = require('sequelize');
const config = require('./config');
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
// 测试数据库连接
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.')
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err)
//   });


var User = sequelize.import('./infrastructure/models/user');
// User.sync({}); // 若数据库表不存在，则创建

//基于SQL语句的原始查询  sequelize.query()
// sequelize.query('SELECT * FROM projects WHERE id = ?',
//   { replacements: ['active'], type: sequelize.QueryTypes.SELECT }
// )

//Model查询方式
User.findAndCountAll({  //count  findAll  findOne
  where: {
    name: 'joy'
  },
  //order: [],  //排序 降序[['name', 'DESC']]  升序['name']
  limit: 10,  //分页查找条数
  offset: 0,   //分页查找第几条开始
  raw:true,  // 查询结果sequelize模型转成数组
  attributes:["id", "name"]    //  需要查询出的字段   attributes:{exclude: ['id'] },剔除不想要的属性
}).then(users => {
  console.log(users);
})
console.log('*****************************');
// User.create({
//   name: 'joy',
//   sex: '男',
//   birthday: '2020-04-10 00:00:00',
//   phone: '12345678900',
//   email: '123456@qq.com',
//   identity: '管理员',
//   shcool_id: 1,
//   faculty_id: 1,
//   major_id: 1,
//   user_name: 'joy',
//   head_image: '',
//   experience: 101
// })
console.log('*****************************');
// User.destroy({
//   where: {
//     id: 3
//   }
// }).then(function(result) {
//   console.log(result)
// }).catch(function(error) {
//   console.log(error)
// });
console.log('*****************************');
// User.update({
//   experience:105
// },{
//   where:{
//     name: "joy"
//   }
// }).then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error)
// })
*/