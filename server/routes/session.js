
//this route contains normal session based authentication without using passportjs

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


//this route is used for session based authentication no----passport js
app.post("/auth",(req,res)=>{
    const user=req.body.name;
    const password=req.body.pass;
    console.log(user,password)
   const auth= db.find(ob=>{

        if(ob.user==user&&ob.pass==password){
            return ob;
        }

    });
    if(auth){
        //when user is validated the session object is modified  which causes session cookie when res is poassed
        req.session.user={
            id:user
        }
        res.send(req.sessionID)
    }else{
        res.send("fuck you")
    }


})

//using pure session and normal database to access protected route
app.post("/cart",(req,res,next)=>{
    console.log(req.sessionID)
    //since session id is stored in cookie when making other request if  session id from cookie is not found cant acess session obj for that id
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
    
    const item=req.body;
    if(req.session.cart){
        req.session.cart.items.push(item);
        res.send("obj is added in to the item array")
    }else{
        req.session.cart={
            items:[item]
        }
        res.send("new added")
    }

})


app.delete("/session-logout",(req,res)=>{

    //destroys the session storage in server side
    req.session.destroy(err=>{
        console.log("session destroyed")
    })
    //helps to clear session cookie in client side
    res.clearCookie("connect.sid").send("session cleared");
   
    
 })

