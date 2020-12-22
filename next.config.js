const withCss = require('@zeit/next-css')

const configs = {
    //编译文件的输出目录
    distDir: 'dest',
    //是否给每个路由生成Etag 让浏览器使用缓存 如果请求相同
    generateEtags: true,
    //页面内容缓存配置
    onDemandEntries: {
        //内容在内存中缓存的时长
        maxInactiveAge: 25* 1000,
        //缓存多少页面
        pagesBufferLength: 2
    },
    //在page目录下认为是页面的文件后缀
    pageExtensions:['jsx','js'],
    // 配置bulidId
    generateBuildId: async () => {
        if(process.env.YOUR_BUILD_ID){
            return process.env.YOUR_BUILD_ID
        }

        return null
    },
    //手动修改webpack config
    webpack(config, options) {
        return config
    },
    // 修改webpackdevMiddleware 配置
    webpackDevMiddleware: config => {
        return config
    },
    // 配置process.env
    env: {
        customKey: 'value',
    },
    //下面两个需要在'next/config'来读取
    // 只有在服务端渲染时才会获取配置
    serverRuntimeConfig:{
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET,
    },
    // 服务端渲染和客户端渲染都可以获取的配置
    publicRuntimeConfig: {
        staticFolder: '/static',
    },

}


if(typeof require !== 'undefined'){
    require.extensions['.css'] = file => {}
}

module.exports = withCss({
    // env: {
    //     customKey: 'value',
    // },
    // serverRuntimeConfig:{
    //     mySecret: 'secret',
    //     secondSecret: process.env.SECOND_SECRET,
    // },
    // // 服务端渲染和客户端渲染都可以获取的配置
    // publicRuntimeConfig: {
    //     staticFolder: '/static',
    // },
})