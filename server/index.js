//necessary imports
const express=require ("express");
const app=express();
const port=2900;
const useroute=require("./routes/user");
//cross origin resource sharing it is a protocal to help applicationt o accept api request from certain domain 
const cors = require("cors")
//importing passport middle ware 
const passport=require("passport");
//importing the local strategy setup module
require("./configs/local");





//global middle ware to interecpt request 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
//register passport middle ware 
app.use(passport.initialize());
app.use(passport.session());








//now register the router always keep it after the middle wares
//setting prefix is good dont need to notify path in every route
app.use("/userroute/api/v1",useroute);


//check passport middle ware in this route
app.get("/login",passport.authenticate("local"),(req,res)=>{

    console.log("account has been authenticated")
    res.send(200);
})








//starting the server in defined port of 2900
app.listen(port,(req,res)=>{
    console.log("server is running on 2900 port hai")
})