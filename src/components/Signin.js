import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './css/signin.css';
const Signin = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginUser = async (e) => {
        e.preventDefault();
        
        const res = await fetch(`/api/login`, {
            method : 'POST',
            headers:{
                    "Content-Type" : "application/json"
            }, 
            body:JSON.stringify ({
             email,
             password   
            })

        });
        const json = await res.json()
        if(json.success){
          // redirect
          localStorage.setItem('token', json.token);
          localStorage.setItem('user', json.user)
          console.log(json.user)
        window.alert("Login Successfully");
          history.push("/");
          history.go(0);
        }else{
          window.alert("Invalid credentials");
        }
    }
    return (
        <div>
            <form  className='signin-page' method="POST">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" class="btn btn-primary" onClick={loginUser}>SIGN IN</button>
                <p><Link to='/signup'>Register Now</Link></p> 
                 <p><Link to='/forgotpassword'>Forgot Password</Link></p> 
            </form>
        </div>
    )
}

export default Signin
