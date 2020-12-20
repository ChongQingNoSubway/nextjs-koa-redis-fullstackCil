<<<<<<< HEAD
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
    ./redis-server.exe ./redis.window.conf
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

## 

=======

