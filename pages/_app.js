import App, { Container} from 'next/app'
import 'antd/dist/antd.css'
import Layout from '../components/layout'
import Mycontext from '../lib/my-context'
import { Button } from 'antd'
import { Provider } from 'react-redux'
// why we need _app.js
// 1. Use _app.js to fix layout
// 2. keep some public state
// 3. give other pages some customized data
// 4. customize process of err 
import store from '../store/store'
import testHoc from '../lib/testHoc'

class MyApp extends App {
  state={
    context: 'contenxt'
  }
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
          <Provider store={store}>
          <Mycontext.Provider value={this.state.context}>
          <Component {...pageProps}/>
          <button onClick={() => this.setState({context: `${this.state.context}111`})}>update context</button>
          </Mycontext.Provider>
          </Provider>
        </Layout>
      </Container>
    )
  }
}

export default testHoc(MyApp)
