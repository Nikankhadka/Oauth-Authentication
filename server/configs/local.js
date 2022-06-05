//will contain seteup for passport local strategy

const passport=require('passport');
//passport strategy class
const {Strategy}=require("passport-local");



const db=[
    {
        email:"nikan.khadka.925@gmail.com",
        password:"nikhildon1"
    },
    {
        email:"nikan.khadka.9251@gmail.com",
        password:"nikhildon2"
    },
    {
        email:"nikan.khadka.9252@gmail.com",
        password:"nikhildon3"
    },
    {
        email:"nikan.khadka.9253@gmail.com",
        password:"nikhildon4"
    }


]




//use fucntion to setup passport
passport.use(
    //psss instance or constructor of startegy
    new Strategy(
        //this first object heps to set condition of username==email
        {
            usernameField:"email",
        },
       async (email,password,done)=>{
            //if the above obj is removed username field is printed
            
            //always tryt t use try catch block
            try{
                //since we get email and password input fromt the front end authenticate the information
                const auth=await db.find(obj=>{
                    if(obj.email===email && obj.password===password){
                        return obj;
                    }
                })
                if(!auth){
                    console.log("invalid account")
                    //done is similar to next passes onto the request handler and als store infor in req object
                   done(null,null)
                }else{
                    console.log("account authenticated successfully")
                    //done function helps to serialize or store user into session once authentivated
                    done(null,auth)
                }

            }catch(err){
            //if there ia error then 
                done(err,null)
            }
           
        }   
        
    ))
     
    

    


//need tos serialize user into session
passport.serializeUser((user,done)=>{
    console.log("serializing user")
    console.log(user)
    done(null,user.email)
}
)

//deserialize user from session and then pass that user to req object
//this funtion is only used when serialize is done then 

passport.deserializeUser( async(id,done)=>{
    console.log("deserializing ")
    //check if it is a valid user 
    try{
        const user= await db.find(obj=>{
            if(obj.email===id){
                return obj;
            }else{
                return null;
            }
        })
        console.log("authenticated and attached user id to request obj")
        if(user) done(null,id)



    }catch(erroro){
        console.log(erroro)
    }
   
})