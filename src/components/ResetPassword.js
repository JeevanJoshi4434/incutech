import React from 'react'
import "./css/forgotPassword.css"
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ResetPassword = () => {
    
    const history = useHistory();
    const [email, setEmail] = useState('');
    
  const eventApply = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/password/forgot`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email
      })

    });
    const json = await res.json()
    if (json.success) {

      // redirect
      localStorage.setItem('jwt', json.token);
      localStorage.setItem('user', JSON.stringify(json.user));
      window.alert("Check your Email");
      history.push("/");
    } else {
      window.alert("please enter right credentials");
    }
  };
  return (
    <div className='forgotPass'>
        <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Enter your email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
      <button type="button" onClick={eventApply} className="btn btn-primary">Send email</button>
    </div>
  )
}

export default ResetPassword
