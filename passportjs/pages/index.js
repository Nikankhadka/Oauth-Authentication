
import {useForm} from 'react-hook-form';
import axios from "axios"









export default function Login(){

  const {register,handleSubmit,formState:{error}}=useForm();

  function formdata(formdata){
    console.log(formdata)
    //first goes the api end point url and then the data then geos the credential
    axios.post("http://localhost:2900/local-login",{
      email:formdata.email,
      password:formdata.password,
  },{withCredentials:true}).then((result)=>{
      if(result.data=="loggedin"){
        window.location.href="/logout"
      }

    }).catch(()=>{
      console.log("error")
    })
    
    

  }

  //register fucntions 
  function registeruser(formdata){
    axios.post("http://localhost:2900/register",{email:formdata.email,password:formdata.password}).then(
      (result)=>{
        console.log(result)
        if(result.data=="registered"){
          console.log("user succesfully registered")
          reload();
        }
      })
    .catch((eroror)=>{
      console.log(eroror)
    })

  }
  





  return(
    
    <div className="form">

<h1>Authentication Form</h1>

<form className="form">

<input type="text" className="input" placeholder='email'  {...register("email",{required:true})} /> 
<input type="text" className="input" placeholder='password'  {...register("password",{required:true})} /> 
<input type="submit" className="btn" value="login" onClick={handleSubmit(formdata)} />
  <button className="btn" onClick={handleSubmit(registeruser)}>Register</button>


</form>
<a className='btn' href="http://localhost:2900/auth/google"> Sign in with gogole</a>
<a className='btn' href="http://localhost:2900/auth/facebook"> Sign in with facebook</a>
    </div>
    
    
    )
}


