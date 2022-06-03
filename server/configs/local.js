//will contain seteup for passport local strategy

const passport=require('passport');
//passport strategy class
const {Strategy}=require("passport-local");

//use fucntion to setup passport
passport.use(
    //psss instance or constructor of startegy
    new Strategy(
        {
            usernameField:"email",
        },
        (email,password,done)=>{
            console.log(email);
            console.log(password)
        }
    )
     
    )

    