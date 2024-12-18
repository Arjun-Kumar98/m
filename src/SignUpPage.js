import './loginPage.css'
import React,{use, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




function SignUpPage(){
const [emailId,setEmailId] = useState('');
const[password,setPassword]=useState('');
const[confirmPassword,setConfirmPassword]=useState('');
const navigate = useNavigate();
const handleSubmit = async()=>{

  if(!emailId||!password||!confirmPassword){
    alert("Please Enter all the fields");
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if(!emailPattern.test(emailId)){
alert("Please Enter a valid email Id");
return;
  }
    if(password!==confirmPassword){
        alert("Passwords do not match!");
        return;
    }

    const payload={
        emailId: emailId,
        password: password,
    };

    try{
        const response = await axios.post('http://localhost:8080/user/registerUser',payload);
        if(response.status === 200){
            alert("User registered successfully!");
            navigate('/');
        }else{
            alert("Failed to register.");
        }
    }catch(error){
        console.error("Error occurred while signing up:",error);
        alert("An error occured during registration");
    }
    };




    return(
        <div className="App">
        <div className="App-header">
          <div style={{width:'40%'}}>
          <p style={{fontSize:'80px', fontFamily:'Montserrat'}}>Sign Up</p>
            <div style={{width:'100%'}}>
              <input type='text' placeholder='Email Id' value={emailId} onChange={(e)=>setEmailId(e.target.value)}></input><br></br>
              <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}></input><br></br>
              <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input>
            </div>
          
              <button class="login-button" onClick={handleSubmit}>Register</button>
              </div>
        </div>
      </div>
    );
}

export default SignUpPage;