export default(Comp) => {
    function TestHocCom({Component, pageProps,...rest}) {
        console.log(Component,pageProps)
        if(pageProps){
            pageProps.test = '123'
        }
        return <Comp  Component={Component} pageProps={pageProps} {...rest}/>
    }
    TestHocCom.getInitialProps = Comp.getInitialProps
    return TestHocCom
}