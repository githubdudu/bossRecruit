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
4. Remove redirectUrl in state.
5. Remove onFormError and related action(sync_readMessage), do not send component error state to Redux state.
6. Update all npm libraries.
7. Add Prettier and formatted the files.

   TODO: Media query
   TODO: Split the redux file
   TODO: Use Redux Saga

   TODO: add Unit Text
   TODO: Add mockserver Nock