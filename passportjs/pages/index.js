
import {useForm} from 'react-hook-form';
import axios from "axios"









export default function Login(){

  const {register,handleSubmit,formState:{error}}=useForm();

  function formdata(formdata){
    console.log(formdata)
    //first goes the api end point url and then the data then geos the credential
    axios.get("http://localhost:2900/login").then((result)=>{
    console.log(result.data)

    }).catch(()=>{
      console.log("error")
    })
    
    

  }
  return(
    
    <div className="form">

<h1>Authentication Form</h1>

<form className="form">

<input type="text" className="input" placeholder='email'  {...register("email",{required:true})} /> 
<input type="text" className="input" placeholder='password'  {...register("password",{required:true})} /> 
<input type="submit" value="login" onClick={handleSubmit(formdata)} />



</form>
<a className='gogo' href='http://localhost:2900/login' onClick={()=>{
  console.log("authenticated hudai")

}}> Sign in with gogole</a>
    </div>
    
    
    )
}


