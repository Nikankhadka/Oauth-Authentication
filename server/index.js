//necessary imports
const express=require ("express");
const app=express();
const port=2900;
const useroute=require("./routes/user");
//cross origin resource sharing it is a protocal to help applicationt o accept api request from certain domain 
const cors = require("cors")

//it helps to store user data in server when logs in which later can be used fro authentivation 
const session=require("express-session")


//importing passport middle ware 
const passport=require("passport");
//importing the local strategy setup module
require("./configs/local");





//global middle ware to interecpt request 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(session(
    {
        secret:"secretkeytoencodeanddecodeinformation",
        resave:false,
        saveUninitialized:false
    }

));

//register passport middle ware 
app.use(passport.initialize());
app.use(passport.session());



var value= 0;




//now register the router always keep it after the middle wares
//setting prefix is good dont need to notify path in every route
app.use("/userroute/api/v1",useroute);


//check passport middle ware in this route
app.get("/cart",(req,res)=>{

    //obj destrcutring test 
    const {nikan}={
        nikan:()=>{
            console.log("nikan is a good guy")
        }
    }
    nikan();

    res.send(req.session.cart);




})

app.post("/cart",(req,res,next)=>{
    if(req.session.user){
        console.log(req.session.user)
        const auth=db.find(obj=>{
            if(obj.user==req.session.user.id){
               return obj;
                
            }
        })
        if(auth){
            console.log("verifeid hai")
            next()
        }  
    }else{
        res.send("fuck u haiiiii")
    }
    

},
    (req,res,next)=>{
        res.send("user veirified ok to use the routew")
    // const item=req.body;


    

    // if(req.session.cart){
    //     req.session.cart.items.push(item);
    //     res.send("obj is added in to the item array")
    // }else{
    //     req.session.cart={
    //         items:[item]
    //     }
    //     res.send("new added")
    // }


  

})


const db=[

    {
        user:"nikan",
        pass:"khadka"
    },
    {
        user:"nikan1",
        pass:"khadka1"
    },
   
    {
        user:"nikan2",
        pass:"khadka2"
    },
   
   



]
app.post("/auth",(req,res)=>{
    const user=req.body.name;
    const password=req.body.pass;
   const auth= db.find(ob=>{

        if(ob.user==user&&ob.pass==password){
            return ob;
        }

    });
    if(auth){
        req.session.user={
            id:user
        }
        res.send(req.session.user)
    }else{
        res.send("fuck you")
    }


})









//starting the server in defined port of 2900
app.listen(port,(req,res)=>{
    console.log("server is running on 2900 port hai")
})