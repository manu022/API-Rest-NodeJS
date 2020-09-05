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

app.listen(8080);
console.log('Server on port 4000');
        
   
