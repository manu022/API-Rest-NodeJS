const express = require('express');
const app = express();
const passport = require('passport')

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/'));
app.use(passport.initialize());

// routes
app.use(require("./routes/index"));

let retries = 5;

while (retries){
    try{
        await app.listen(8080);
        console.log('Server on port 8080');
        break;
    } catch(err){
        console.log(err);
        retries -=1;
        console.log(`retries left: ${retries}`);
        //Espera 5 segundos
        await new Promise(res => setTimeout(res, 5000));
    }

}