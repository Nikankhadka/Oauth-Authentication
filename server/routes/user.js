
//creating seperate route according to use case is good helps to seperate the routes and request handler 
//keeping the main index file with necessary imports and middle ware to utilize 


//importing router funtion from express
const {Router}=require("express");

//instance of router by calling function returns an object
const router=Router();


//controllers following the mvc pattern conrollers contains the request handler to the routes
const usercontroller=require("../controllers/usecontroller");










//now specify differenct api endpoints using router 

//if we specify the prefix for router than we dont need to specify the path on every endpoint
//but /:id is a parameter is need toi be specified
router.get("/",usercontroller.login);












//we need to export the router object to be used in server index file
module.exports=router;