//每收到一个http请求，koa就会调用app.use()注册的async函数
const Koa = require('koa');
//解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');//允许其它域访问！！！
// 导入controller middleware:
const controller = require('./controller');

const app = new Koa();

// log request URL以及页面执行时间:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});





app.use(cors());//在创建router之前注册 
//koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());
// 使用middleware  自动扫描controller，注册router
app.use(controller());



app.listen(3000);
console.log('app started at port 3000...');

//所有处理URL的函数按功能组存放在controllers目录，今后我们也只需要不断往这个目录下加东西就可以了，app.js保持不变。