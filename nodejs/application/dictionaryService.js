const model = require('../infrastructure/model');

function getAllDictionaries() {
    return new Promise(function(resolve,reject){
        let Dictionary = model.dictionary;
        Dictionary.findAndCountAll({  //count  findAll  findOne
            order: [],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};

function getDictionaryByName(name) {
    return new Promise(function(resolve,reject){
        let Dictionary = model.dictionary;
        Dictionary.findAll({  //count  findAll  findOne
            where: {
                name: name
            },
            order: [],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};
function getDictionaryDetailByDictionaryId(dictionary_id) {
    return new Promise(function(resolve,reject){
        let Dictionary_detail = model.dictionary_detail;
        Dictionary_detail.findAll({  //count  findAll  findOne
            where: {
                dictionary_id: dictionary_id
            },
            order: [],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};


function insertDictionary(name,englishName,description) {
    return new Promise(function(resolve,reject){
        let Dictionary = model.dictionary;
        Dictionary.create({
            name: name,
            englishName: englishName,
            description: description,
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};
function insertDictionaryDetail(items) {
    return new Promise(function(resolve,reject){
        let Dictionary_detail = model.dictionary_detail;
        Dictionary_detail.bulkCreate(items)
        .then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};


function updateDictionary(id,name,englishName,description) {
    return new Promise(function(resolve,reject){
        let Dictionary = model.dictionary;
        Dictionary.update({
            name: name,
            englishName: englishName,
            description: description
        },{
            where:{
                id: id
            }
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};
function updateDictionaryDetail(dictionary_id,items) {
    return new Promise(function(resolve,reject){
        let Dictionary_detail = model.dictionary_detail;
        Dictionary_detail.destroy({
            where: {
                dictionary_id: dictionary_id
            }
        }).then(function(result) {
            return Dictionary_detail.bulkCreate(items)
        })
        .then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    
    });
};


function deleteDictionaryByName(name) {
    return new Promise(function(resolve,reject){
        let Dictionary = model.dictionary;
        Dictionary.destroy({
            where: {
                name: name
            }
        }).then(function(result) {
            resolve(result)
        }).catch(function(error) {
            console.log(error)
        });
    });
};
function deleteDictionaryDetailByDictionaryId(dictionary_id) {
    return new Promise(function(resolve,reject){
        let Dictionary_detail = model.dictionary_detail;
        Dictionary_detail.destroy({
            where: {
                dictionary_id: dictionary_id
            }
        }).then(function(result) {
            resolve(result)
        }).catch(function(error) {
            console.log(error)
        });
    });
};

module.exports = {
    'getAllDictionaries': getAllDictionaries,
    'getDictionaryByName': getDictionaryByName,
    'getDictionaryDetailByDictionaryId': getDictionaryDetailByDictionaryId,
    'insertDictionary': insertDictionary,
    'insertDictionaryDetail': insertDictionaryDetail,
    'updateDictionary': updateDictionary,
    'updateDictionaryDetail': updateDictionaryDetail,
    'deleteDictionaryByName': deleteDictionaryByName,
    'deleteDictionaryDetailByDictionaryId': deleteDictionaryDetailByDictionaryId,
};

