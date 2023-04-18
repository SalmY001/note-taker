const express = require("express");
const apiroutes = require("./apiroutes");
const htmlroutes = require("./htmlroutes");

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use('/api', apiroutes)
app.use('/', htmlroutes)
const port = process.env.PORT || 3001
app.listen(port,function(){
    console.log("server up and running")
});