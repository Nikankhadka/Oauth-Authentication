
const passport=require("passport");
const Router=require("express");
const router=Router();


//import passport auth controller
const passportcontroller=require("../controllers/passportauth");
require("../configs/passportStrat");



//register user
router.post("/register",passportcontroller.register);










//passport-js local strategy
router.post("/local-login",passport.authenticate("local"),passportcontroller.locallogin);


//nor request handler needed for google and facebook directly redirected to callback url on authorization

// route setup for google oauth 2 generates pop and authorizes user
router.get("/auth/google",passport.authenticate("google",
{scope:['email','profile']}))


//this is a callbak route to make sure the user is authenticated and serialized into session once complete they are redirected to the home page
router.get("/pr-route",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/logout",
    failureRedirect:"http://localhost:3000"
}))






// route setup for facebook
router.get("/auth/facebook",passport.authenticate("facebook",
{scope:['public_profile','email']}))

//this is a protected route which can only be accessed after authentication
router.get("/pr-route/facebook",passport.authenticate("facebook",{
    successRedirect:"http://localhost:3000/logout",
    failureRedirect:"http://localhost:3000"
}))










//basic logout route when user logouts 
//directly link or take response and redirect from client side
router.get("/logout",passportcontroller.isAuthenticated,passportcontroller.logout)



//this is the protected testing route
router.get("/nikan",passportcontroller.isAuthenticated,(req,res)=>{
    console.log("authenticated route bhitera")
    res.send("succesfully authenticated inside")

})


module.exports=router;
