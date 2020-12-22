
This is a nextjs-koa-radis project that is learn different frameworks and  SSR

## Getting Started

First, run the development server:

npm install


```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration and construction process
#### we will need to make sure that node was installed on your computer

#### The project main use frameworks :   
    Front-end: react-nextjs  
    Back-end: node - koa  
    Database: redis  

- First we input  
    ```
    npm install -g create-next-app   
    ```  

  
    for Introducing next framework  

- Second the nextjs is a server, and it can onley deal with SSR. So the node(koa) can be used to handle data interface and connection of database, keep session state.   
    ```
    npm install koa   
    ```
  
    and then create the file <span style="color:red;">server.js</span> in the project root directory for server configuration.

- Third using redis as database and connect node to radis  
    The radis(windows) installation : [microsoft-readis](https://github.com/microsoftarchive/redis/releases) version: 3.0.504  
    After installation, we can set the port and password we want in the window.conf file  
    open windows powershell in your radis installation directory     

    ```
    ./redis-server.exe ./redis.windows.conf
    ```



    open a new windows powershell   

    ```
     ./redis-cli -p xxxx(setting port)
     auth xxxxxxx(password)
    ```  
    For test  

    Use ioredis to connect node to radis  
    ```
     npm install ioredis
    ```

    There are some test codes for node operation redis in the test directory    

- Fourth Integrated antd-design and load css

    First we load antd   
    ```
    npm install antd
    ```  

    Due to optimization issues, we use on-demand loading for antd components  
    ```  
    npm install babel-plugin-import
    ```  

    Create a babelrc file in the root directory to configure the plug-in and babel  
    ```  
    {
    "presets": ["next/babel"], // next babel default config (must add)
    "plugins": [
        [
            "import",
            {
                "libraryName": "antd" //import {button} from 'antd' =  import button from 'antd/lib/button'
                //"style": "css" bug for here 
            }
        ]
    ]
    }
    ```  



    Due to the problem of webpack, we add style to babelrc to cause an error. 
    First we need @zeit/next-css to load css  
    ```
    npm install  @zeit/next-css
    ```  
    and then add file next.config.js to root directory, writting to configuration of next-css loader  

    
    after that ,we introduce globally in _app.js in the page directory:  
    ```  
    import 'antd/dist/antd.css'
    ```  

- Fifth add styled-component
    the jsx is not only way we write the Css, so I also installed styled-component that can write Css  

    ```  
    npm install style-components babel-plugin-styled-components  

    ```  
    and then I need to add plugin into file .babelrc under root directory  

    ```  
    [  
        "styled-components", { "ssr": true }  
    ]  
    ```  
    Finally we need to confg the file _document.js under page diretory  

    ```  
    import { ServerStyleSheet } from 'styled-components'

    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp : App => props => sheet.collectStyles(<App {...props}/>),
            })
            const props = await Document.getInitialProps(ctx)

            return {
                ...props,
                styles: <>{props.styles}{sheet.getStyleElement()}</>
            }

        }finally{
            sheet.seal()
        }
    }  
    ```  
    it is a part of file _document.js.  

## 

=======

