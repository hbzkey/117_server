const dictionaryService = require('../application/dictionaryService');

var getAllDictionaries = async (ctx, next) => {
    dictionaries = ''
    await dictionaryService.getAllDictionaries()
    .then(function(data){
        console.log('getAllDictionaries');
        console.log(data);
        dictionaries = data
    })
    .catch(function(err){
        console.log('catch:'+err);a
    })
    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'dictionaries': dictionaries
    };
}
var getDictionaryByName = async (ctx, next) => {
    name = ctx.request.body.name;
    dictionary = {}
    await dictionaryService.getDictionaryByName(name)
    .then(function(data){
        console.log(data);
        dictionary = data[0];
        return dictionaryService.getDictionaryDetailByDictionaryId(data[0].id);
    })
    .then(function(data){
        console.log(data);
        dictionary.items = data;
    })
    .catch(function(err){
        console.log('catch:'+err);
    })

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'dictionary': dictionary
    };
}


var createDictionary = async (ctx, next) => {
    let id = ctx.request.body.id;
    let name = ctx.request.body.name;
    let englishName = ctx.request.body.englishName;
    let description = ctx.request.body.description;
    let items = ctx.request.body.items;
    let operation = ctx.request.body.operation;  // 1:新增  2:编辑

    state = '';
    await dictionaryService.getDictionaryByName(name)
    .then(function(data){
        console.log(data);
        // 新增：若查找的nameid不存在（可创建），若查找的nameid存在（不可创建）
        // 编辑：若查找的nameid不存在（说明改了name,修改字典和删除id的项，创建项），
        //       若查找nameid存在（id与nameid一样，修改字典和删除id的项，创建项），
        //                      （id与nameid不一样，不可修改）；
        if(data.length != 0 && (operation==1 || operation==2 && data[0].id != id)){  
            // dictionary already exist
            console.log('dictionary already exist');
            state = -1;
        }
    })
    .catch(function(err){
        console.log('catch:'+err);
    })
    if(state == '' && operation==1){
        await dictionaryService.insertDictionary(name,englishName,description)
        .then(function(data){
            console.log(data);
            state = data;
            for(let i=0;i<items.length;i++){
                items[i].dictionary_id = data.id
            }
            return dictionaryService.insertDictionaryDetail(items);
        })
        .then(function(data){
            console.log(data);
        })
        .catch(function(err){
            console.log('catch:'+err);
        })
    }else if(state == '' && operation == 2){
        await dictionaryService.updateDictionary(id,name,englishName,description)
        .then(function(data){
            console.log(data);
            state = data;
            for(let i=0;i<items.length;i++){
                items[i].dictionary_id = id
            }
            return dictionaryService.updateDictionaryDetail(id,items);
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

var deleteDictionary = async (ctx, next) => {
    name = ctx.request.body.name;

    state = ''
    await dictionaryService.getDictionaryByName(name)
    .then(function(data){
        console.log(data);
        return dictionaryService.deleteDictionaryDetailByDictionaryId(data[0].id);
    })
    .then(function(data){
        console.log(data);
        return dictionaryService.deleteDictionaryByName(name);
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
    'GET /api/getAllDictionaries': getAllDictionaries,
    'POST /api/getDictionaryByName': getDictionaryByName,
    'POST /api/createDictionary': createDictionary,
    'POST /api/deleteDictionary': deleteDictionary,
};