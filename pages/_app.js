import App, { Container} from 'next/app'
import 'antd/dist/antd.css'
import Layout from '../components/layout'
// why we need _app.js
// 1. Use _app.js to fix layout
// 2. keep some public state
// 3. give other pages some customized data
// 4. customize process of err 

class MyApp extends App {

  static async getInitialProps({Component,ctx}) {
    // this method will be called at switch page
    console.log('app init')
    let pageProps 
    if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx)
    }  
    return { 
      pageProps
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </Container>
    )
  }
}

export default MyApp
