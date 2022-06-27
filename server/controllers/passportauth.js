


const usermodel=require("../dbmodels/usermodel");


//importing the local strategy setup module
require("../configs/passportStrat");


//setting up middlw are to authorize the user  for all strategies
exports.isAuthenticated=(req,res,next)=>{

    //we can use below is authenticated funciton to check 
 
    console.log("authentication check garne middleware bhitra")
    console.log(req.user)
    console.log(req.isAuthenticated());

    //this is true if deserialize user is called (get session id from cookie then acces session obj in server and attach the user )
    req.user? next() : res.send("you are not authenticated")
   
}



exports.register=async(req,res)=>{
    console.log("inside controller register")
    console.log(req.body)
   const registered=await usermodel.registeruser(req.body.email,req.body.password)
   if(registered){
    console.log("user registered")
       res.send("registered")
   }else{
    res.send("not registered")
   }

}



exports.locallogin=async(req,res)=>{
    console.log(req.session)

    //use this response in client side to redirect from there 
    res.send("loggedin")
}










exports.logout=async(req,res)=>{
    console.log("logging out")
    //deletes session data in servber and in db or req.logout 
   await req.session.destroy((eee)=>{
        console.log("errroro")
    })
 
    //deletes cookie from cleint 
   await res.clearCookie("connect.sid")
     res.redirect("http://localhost:3000")
 
     //cant use send methods twice like redirect send json  or render
    // res.send("logged out")
 
 }