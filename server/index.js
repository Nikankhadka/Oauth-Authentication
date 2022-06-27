//necessary imports
const express=require ("express");
const app=express();
const port=2900;

//cross origin resource sharing it is a protocal to help applicationt o accept api request from certain domain 
const cors = require("cors")

//it helps to store user data in server when logs in which later can be used fro authentivation 
const session=require("express-session")


//importing passport middle ware 
const passport=require("passport");



//connect mongo to store session in mongo db collections
const mongostore=require("connect-mongo");



//routes
const useroute=require("./routes/user");
const passportroute=require("../server/routes/passportauth");






//global middle ware to interecpt request 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials:true
}))


app.use(session(
    {
        secret:"secretkeytoencodeanddecodeinformation",
        resave:false,
        saveUninitialized:false,
        //this cookie property helps to schedule deuration of cookie in froont ned
        cookie:{
            maxAge:1000*60*60*24
        },

        //we using connect mongo to store session data, prevents from losing on server crash
        store:mongostore.create({
            mongoUrl:"mongodb://localhost/nikan2",
        }),
    }

));

//register passport middle ware 
app.use(passport.initialize());
app.use(passport.session());




//now register the router always keep it after the middle wares
//setting prefix is good dont need to notify path in every route
app.use("/userroute/api/v1",useroute);
app.use(passportroute);











//check mongodb connections 

app.get("/connect",async (req,res)=>{
    try{
         //ceated connection with db
   await mongo.connect()

    //cretae instance of model and also pass the document in constructor and use sinsatnce t save thedoc
//    const cc=new check({
//     name:"nikan",
//     age:10,
//     rollno:22
//    })
   
   //another way to add doc is 
   const doc=await usermodel.create({
    
        name:"nikan khadka",
        age:7,
        email:"nikan.khadka.925@gmail.com",
       
   })
//before saving the document we can chneg the calue 
    doc.name="nikan2"
//as doc represents the obj of document its vlaue can be updated before saving
   doc.save()

   console.log(doc)

   //catch is important to catch and point out error wihoutt disturbin gthr progranm flow
}catch(e){
        console.log(e.message)
    }
   

})

app.get("/get-doc",async(req,res)=>{
   await  mongo.connect()
  const docs= await usermodel.find();
  res.send(docs);
})







//starting the server in defined port of 2900
app.listen(port,(req,res)=>{
    console.log("server is running on 2900 port hai")
})