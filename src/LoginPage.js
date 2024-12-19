import './loginPage.css'
import React,{useState} from 'react';
import axios from 'axios';
import useConfig  from './hooks/useConfig';
import { useNavigate } from 'react-router-dom';
function LoginPage(){
const [emailId,setEmailId] = useState('');
const [password, setPassword] = useState('');
 const { config } = useConfig();

const navigate = useNavigate();

const handleSignUp = () => {
  navigate('/signUp');
}

const handleSubmit = async()=>{

  if(!emailId||!password){
    alert("Please Enter all the fields");
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if(!emailPattern.test(emailId)){
alert("Please Enter a valid email Id");
return;
  }
try{
    const response = await axios.get(`${config.API_URL}/user/loginUser`,{params:{
emailid:emailId,
password:password
  },
});
  if(response.status === 200){
    const message = response.data.message;
if(message==="success"){
    const token = response.data.token;
    const userId = response.data.userId;
    alert("User has logged in successfully");
  localStorage.setItem("token",token);
  localStorage.setItem("userId",userId);
  navigate('/movieList');
}
  }else{
    alert("Incorrect username or password");
  }
}catch(error){
  console.error("Error occurred during login",error);
  alert("an error occurred during login");
}

};



    return(
        <div className="App">
        <header className="App-header">
          <div style={{width:'40%'}}>
          <p style={{fontSize:'80px', fontFamily:'Montserrat'}}>Sign In</p>
            <div style={{height:'55%',alignContent:'center'}}>
              <input type='text' placeholder='Email Id' value ={emailId} onChange = {(e)=>setEmailId(e.target.value)}></input><br></br>
              <input type='password' placeholder='Password' value = {password} onChange = {(e)=>setPassword(e.target.value)}></input>
            </div>
            <div>
           <p style={{fontSize:'10px'}}>New Here? Continue to <button class="btn btn-link" onClick={handleSignUp}>Sign Up</button></p>
            </div>
              <button class="login-button" onClick={handleSubmit}>Login</button>
              </div>
        </header>
      </div>
    );
}

export default LoginPage;