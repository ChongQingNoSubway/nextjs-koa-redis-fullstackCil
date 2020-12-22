const withCss = require('@zeit/next-css')

const configs = {
    //Output directory of compiled files
    distDir: 'dest',
    //whether to generate Etags for each routers(let the browser use the cache in the same request)
    generateEtags: true,
    //page content cache configuration
    onDemandEntries: {
        //how long the content is cached in memory
        maxInactiveAge: 25* 1000,
        //how many pages to cache
        pagesBufferLength: 2
    },
    //define the type of pages files available in the page directory 
    pageExtensions:['jsx','js'],
    // configuration bulidId
    generateBuildId: async () => {
        if(process.env.YOUR_BUILD_ID){
            return process.env.YOUR_BUILD_ID
        }

        return null
    },
    //manual modification webpack config
    webpack(config, options) {
        return config
    },
    // modification webpackdevMiddleware configuration
    webpackDevMiddleware: config => {
        return config
    },
    // config process.env
    env: {
        customKey: 'value',
    },
    //the following two need to be read  in 'next/config'
    // The configuration is only obtained when the server is rendering
    serverRuntimeConfig:{
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET,
    },
    // configuration available for both server-side rendering and client-server rendering
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
    // // configuration available for both server-side rendering and client-side rendering 
    // publicRuntimeConfig: {
    //     staticFolder: '/static',
    // },
})