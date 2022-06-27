const mongoose=require('mongoose');
//this is a async connect function to connec to database
 async function connect(){
 await mongoose.connect("mongodb://localhost/nikan2").then(
        ()=>{
            console.log("connected to database")
        }
    ).catch((error)=>{
        console.log("not connected "+error)
    })
   
}

module.exports={connect}
