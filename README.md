### 1. A version for dev, **client side**.
### 2. Working with BossRecruit-server dev branch. Test on same machine
### 3. Target port: "http://localhost:4000", set json to solve CORS
    //package.json
    "proxy":"http://localhost:4000"
### 4. Client server set: "http://localhost:3000"

### run by
    npm start

1. Add Webpack alias. 
2. Add Reselect.
3. Add AuthRoute. Redesigned route.

   TODO: remove errInfo, errMsg, onFormError, use page state instead for Login and Register

   TODO: do not use redirectUrl to control
   TODO: Split the redux file
   TODO: Use Redux Saga
   TODO: add eslint
   TODO: add Unit Text
   TODO: Add mockserver Nock