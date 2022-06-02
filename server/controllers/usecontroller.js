//this controller contains the request handler for the user route 

exports.login=async(req,res)=>{
    try{
        console.log(req.oidc.isAuthenticated());
        res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');




    }catch{
        res.sendStatus(404);
    }


}