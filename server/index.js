//necessary imports
const express=require ("express");
const app=express();
const port=2900;
const bodyParser=require("body-parser");
const useroute=require("./routes/user");
//importing auth function from config to register
const auth=require("./configs/Oauth");
//middle ware function which can be used to verify user login status before allowing to acces the given route
const {requiresAuth}=require("express-openid-connect");
//cross origin resource sharing it is a protocal to help applicationt o accept api request from certain domain 
const cors = require("cors")
app.use(cors())



//global middle ware to interecpt request 
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//register the auth 
app.use(auth);

app.get("/",(req,res)=>{
    console.log(req.oidc.isAuthenticated());
    let authState=req.oidc.isAuthenticated()
    
    if(authState){
        console.log("authenticated")
   res.redirect("http://localhost:3000/logout")}
else{
    console.log("not authenticated")
    res.redirect("http://localhost:3000")
}
}   
)



//using require auth middle ware which helps to authenticate user login status if not direct to login
app.get("/profile",requiresAuth(),(req,res)=>{
    console.log("used has logged in and has access to this route");
    res.send("acces provided")
}
)



//now register the router always keep it after the middle wares
//setting prefix is good dont need to notify path in every route
app.use("/userroute/api/v1",useroute);










//starting the server in defined port of 2900
app.listen(port,(req,res)=>{
    console.log("server is running on 2900 port hai")
})