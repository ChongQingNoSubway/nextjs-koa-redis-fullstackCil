const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const dev = process.env.NODE_ENV!== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


// wait to pages to complie 
app.prepare().then(() => {
    const server = new Koa()
    // const router = new Router()

    //TEST
    // router.get('/test',(ctx)=> {
    //     // ctx.body = `<p>requset test  ${ctx.params.id} </p> `
    //     ctx.body = { success : true}
    //     ctx.set('Content-Type', 'application/json')
    // })

    server.use(async (ctx, next) =>{
        await handle(ctx.req , ctx.res)
        ctx.response = false
    })
    
    // server.use(async(ctx, next)=>{
    //     const path = ctx.path
    //     const method = ctx.method
    //     ctx.body =`<span>koa ${path} ${method}</span>`
    //     await next()
    // })

    // server.use(router.routes())

    server.listen(3000,()=>{
        console.log('koa server is starting')
    })
})



