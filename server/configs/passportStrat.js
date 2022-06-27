//will contain seteup for passport local strategy

const passport=require('passport');

//passport local strategy
const {Strategy}=require("passport-local");

//google strategy
const GoogleStrategy=require("passport-google-oauth20").Strategy;

const FacebookStrategy=require("passport-facebook").Strategy

//module to hash and compare user
const hash=require("../utils/hash");
const mongo=require("../dbmodels/database");
const usermodel=require("../dbmodels/usermodel");





//use fucntion to setup passport
passport.use(
    //psss instance or constructor of startegy
    new Strategy(
        //this first object heps to set condition of username==email
        {
            usernameField:"email",
        },
       async (email,password,done)=>{
            //if the above obj is removed username field 
            
            //always tryt t use try catch block
            try{
                //establish connection to database
                await mongo.connect();   

                
                //get valid user using usemodel
                const userdoc=await usermodel.usermodel.find({id:email});
                if(userdoc[0]){
                    //validate password 
                    const isvalid=await hash.comparePassword(password,userdoc[0].password);
                    if(isvalid){
                        console.log("user is authenticated succesfully now ser")
                        //once user is checked used is passed onto the serialize
                        done(null,email)
                    }
                }else{
                    //done takes error and id to serilaize if not then through error autmotically
                    done(null,null)
                }

            }catch(err){
            //if there ia error then 
                done(err,null)
            }
           
        }   
        
    ))
     


    
   
    //setup google strategy
    passport.use(
        new GoogleStrategy(
            {
                clientID:"499539449592-g7hi2ajs7eqv6o0ujrkpuo9kp7ltc478.apps.googleusercontent.com",
                clientSecret:"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",
                callbackURL:"http://localhost:2900/pr-route"
                
            },
            //call bnack funciton for the startegy
           async (accessToken,refreshToken,profile,done)=>{
                console.log(profile);
                //when google returns profile after the authorization sends in diff type
                
                //we can use the data provided and use email to store info if no user 
                //else just verify the user and pass the user to serialize after that 

                //get email from profile
                const email=profile._json.email
                
            try{
                //establish connection to database
                await mongo.connect();   
                console.log("gogole start1")
                //get valid user using usemodel
                const userdoc=await usermodel.usermodel.find({id:email});
               
                if(userdoc[0]){
                    
                    
                    done(null,email);

                    //if no user just insert the user in to db
                }else{
                    //for now just take in email and store other information can be gainer later 
                    const newuser=await usermodel.usermodel.create({
                        id:email,
                    })
                    console.log(newuser)
                    //save the user
                   await  newuser.save()
                    done(null,email)
                }

            }catch(err){
            //if there ia error then 
                done(err,null)
            }
                
            }
            
    )
)



//setting up passport facebook
passport.use(
    new FacebookStrategy(
        {
            clientID:"346962650896925",
            clientSecret:"8235a4caabf107230e26810af1496807",
            callbackURL:"http://localhost:2900/pr-route/facebook"
        },
       async (accessToken,refreshToken,profile,done)=>{
            console.log("facebook strategy bhtra")
            
            console.log(profile);
            const id=profile._json.id
            try{
                //establish connection to database
                await mongo.connect();   

                //get valid user using usemodel in array check for object
                const userdoc=await usermodel.usermodel.find({id:id});
                if(userdoc[0]){
                    //no need to validate the account because has validated
                    done(null,id);

                    //if no user just insert the user in to db
                }else{
                    //for now just take in email and store other information can be gainer later 
                    const newuser=await usermodel.usermodel.create({
                        id:id,
                    })
                    //save the user
                    await newuser.save()
                    console.log("new user created"+id)
                    done(null,id)
                }

            }catch(err){
            //if there ia error then 
                done(err,null)
            }
        }
)
)






    


//need tos serialize user into session
passport.serializeUser((user,done)=>{
    console.log("serializing user")
    console.log(user)
    //serilizes id in req.session.passport.user 
    done(null,user)
}
)

//deserialize user from session and then pass that user to req object
//this funtion is only used when serialize is done then 

passport.deserializeUser(async (id,done)=>{
    console.log("deserializing ")
    try{
     
        await mongo.connect();   

        //get valid user using usemodel
        const userdoc=await usermodel.usermodel.find({id:id});
        if(userdoc){
       
            done(null,id);

            
        }else{
           done(null,null);}

    }catch(err){
    //if there ia error then 
        done(err,null)
    }
   
})




// //hashing and salting test 
// //works fins eather way even if the sring output seeem different using compare function we can verifcy the poassword
// app.get("/hash", async(req,res)=>{
//     const hpassword=await hash.hashpassword("nikhil");
//     res.send(hpassword);
// })



// app.get("/compare/:password", async(req,res)=>{
//   const result=await hash.comparePassword(req.params.password,"$2b$10$w7iFynqpRjF5wyFf.noRmON0bCWKdH1bRRZhRkp6OjkkU9BUBlYJy");
//   res.send(result);
// })
