import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./css/ChangePassword.css"

const ChangePassword = () => {
  let history = useHistory();
  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const eventApply = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/password/update`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        oldPassword, newPassword, confirmPassword
      })

    });
    const json = await res.json()
    if (json.success) {

      // redirect
      window.alert("Successfully Changed the Password");
      history.push("/");
    } else {
      window.alert("please enter right credentials");
    }
  };
  return (
    <div className='mainChangePassword'>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Old Password</label>
        <input type="password" onChange={(e) => setoldPassword(e.target.value)} value={oldPassword} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

      </div>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">New Password</label>
        <input type="password" onChange={(e) => setnewPassword(e.target.value)} value={newPassword} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

      </div><div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Confirm New Password</label>
        <input type="password" onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPassword} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
      <button type="button" onClick={eventApply} className="btn btn-primary">Save changes</button>
    </div>
  )
}

export default ChangePassword
