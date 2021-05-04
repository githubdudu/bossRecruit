### 1. A version for build, **client side**.
### 2. Working with BossRecruit-server master branch. Test on same machine, so
### 3. With CORS enabled (on server side).
### 4. Target port: "http://localhost:4000"
### 5. Client server set: "http://localhost:5000"
### 6. enable cookies after using CORS. 
    axios_Config = {...OTHER_Configue, withCredentials: true}
    axios.get(url, axios_Config);
    axios.post(url, data, axios_Config);

### build by
    npm run build
### run by
    serve -s build