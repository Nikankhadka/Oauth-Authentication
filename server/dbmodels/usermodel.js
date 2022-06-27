//in mongo db there thing su should know 
//model:it is an instance of the of a particular collection ehih helps query doc.
//schema:it defines the initial default structure of document obj which is stored in collection

//as we know that for anything to be valid in mongo db it nneds to have content so 
//model or collection cant be empty its schema needs to be defined first 


//importing mongoose module
const mongoose=require("mongoose");
const mongo=require("./database");
const hash=require("../utils/hash");
//if have more nested objects and reusbality is required simple define schema for those
const adressSchema=new mongoose.Schema({
    street:String,
    city:String,
})



//schema is created bypassing obj structure to schema constr 
const userschema=new mongoose.Schema({
    name:String,
    id:{
        type:String,
        required:true,
    },
    password:{
        type:String,
      
    },
    age:{
        type:Number,
        mix:5,
        max:100,

        //these validation only works for db save but dont work in multitask functuoin such as findbyidandupdate 
        //better to use find() and seperately update then save for the validation of the innput to properly work

        //we can validate the input value before saving in db
        validate:{
            //accept only even no 
            validator:v=>v%2==0,
            message:props=>"the no is not even"

        }
    },
    //suppose u want to have compuslory data or modify the property 
    email:{
        type:String,
        
        //lowe or upper
        lowercase:true,
        //min max to count letters or match no
    },

    //we can have default value for 
    created_at:{
        type:Date,
        //sets the default value for doc to current date
        default:()=>Date.now(),
        //does not allow to chnage the value by passing through doc
        immutable:true,
    },
    updatedat:Date,
    //this basically can add object id of other documnet
    friend:mongoose.SchemaTypes.ObjectID,
    //we can have nested object to have multipl infor like this or siple define schema for adress
    adrress:{
        street:String,
        city:String,
    },
    address2:adressSchema,
    //need to define the type of array
    pets:[String],
    
    
})


//model for user collection to query
const usermodel=mongoose.model("user",userschema);


//register user function  need to hash password before registering
async function registeruser(id,password){
    try{
        await mongo.connect();
        console.log("inside model"+id,password)
        const hashedpassword=await hash.hashpassword(password);
        const newuser=await usermodel.create({
            id:id,
            password:hashedpassword,
        })
        await newuser.save()
        
        return true;
    }catch(eror){
        console.log(eror.message)
    }
}




//using the above schema create a model pass the name and schema 
module.exports={usermodel,registeruser}