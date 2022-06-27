const bcrypt=require("bcrypt");


//we can use multiple techniques to hash the password single function or first salt then hash then syntax might be different 
//but if we compaere using the function then it will work
//. gen salt, .hash,.compare

 async function hashpassword(password){
  
    //using bycrypt hash function to hash the password is better to be aync we can use use callbak promise or this way
    const hashvalue= await bcrypt.hash(password,10);
    return hashvalue;

}

async function comparePassword(password,hashvalue){
    const result=await bcrypt.compare(password,hashvalue);
    return result;
}




module.exports={hashpassword,comparePassword}