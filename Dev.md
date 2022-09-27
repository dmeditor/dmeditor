# How to developement

### 1. Clone code

*Note: both dmeditor and dmeditor-sample are recommanded to be under one folder.*

Clone dmeditor code and install
```sh
git@github.com:digimakergo/dmeditor.git
cd dmeditor
npm install
```


Clone dmeditor-sample code
```sh
git@github.com:digimakergo/dmeditor-sample.git
cd dmeditor-sample
npm install
```

### 2. Update local module
In dmeditor folder
```sh
## Use this to avoid duplicated react issue in npm link
 npm link ../dmeditor-sample/node_modules/react
 ## compile
 npm run dist

 ## set dmeditor in link list
 cd dist
 npm link
```

In dmeditor-sample folder
```sh
## link to dmeditor
npm link dmeditor
```

### 3. Run dmeditor sample
In dmeditor-sample folder
```sh
npm start
```

### 4. Dev&Update dmeditor
If there is change in dmeditor, run `npm run dist` in dmeditor and you will see browser of dmeditor-sample will automatically updated.
