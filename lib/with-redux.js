import createStore from '../store/store'
import React from 'react'
const isServer = typeof window === 'undefined'
const __NEXT_REUDX_STORE__ = '_NEXT_REDUX_STORE_'

function getOrCreateStore(initialiStore) {
    if(isServer){
        return createStore(initialiStore)
    }
    if(!window[__NEXT_REUDX_STORE__]) {
        window[__NEXT_REUDX_STORE__] = createStore(initialiStore)
    }

    return window[__NEXT_REUDX_STORE__]
}

export default Comp => {
    class WithReduxApp extends React.Component{
        constructor(props) {
            super(props)
            this.reduxStore = getOrCreateStore(props.initializeStore)
        }

        render() {
            const {Component, pageProps,...rest} = this.props

            console.log(Component,pageProps)
            if(pageProps){
                pageProps.test = '123'
            }
            return <Comp  Component={Component} pageProps={pageProps} {...rest} reduxStore={this.reduxStore}/>
        }

    }

    WithReduxApp.getInitialProps = async (ctx) => {
        const reduxStore = getOrCreateStore()
        ctx.reduxStore = reduxStore

        let appProps = {}
        if(typeof Comp.getInitialProps === 'function'){
            appProps = await Comp.getInitialProps(ctx)
        }
        
        return {
        ...appProps,
        initializeStore: reduxStore.getState()
        }
    }
    return WithReduxApp
}