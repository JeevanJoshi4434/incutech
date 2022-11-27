import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// import './css/signup.css';
const options = ["Graphic Era Hill University Bhimtal","Graphic Era Hill University Haldwani","Graphic Era Deemed to be University Dehradun"]

const SignUp = () => {
    let history = useHistory();
    const [user, setUser] = useState({
        name: "", email: "", password: "", Student_Id: "", role: "user", team: ""
    });
    const [ Collage_name, setSelected] = useState(options[0])
      

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, password, Student_Id, role, team } = user;
        const res = await fetch(`/api/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password, Collage_name:Collage_name, Student_Id, role, team
            })
        });
        const json = await res.json()
        // console.log(json);
        if (json.success) {
            // redirect
            localStorage.setItem('token', json.token);
            window.alert("Signup Successfully");
            history.push("/");
            history.go(0);
        } else {
            window.alert("Invalid credentials");
        }

    }
    return (
        <div>
            <form method='POST' className='signup-page' onSubmit={postData}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input name="name" value={user.name} onChange={handleInputs} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">College Name</label>
                    <select value={ Collage_name} onChange={(e) => setSelected(e.target.value)}>
                        {options.map((value) => {
                            return (
                                <option value={value} key={value}>{value}</option>
                            )
                        })}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Student Id</label>
                    <input name="Student_Id" value={user.Student_Id} onChange={handleInputs} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input name="email" value={user.email} onChange={handleInputs} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input name="password" value={user.password} onChange={handleInputs} type="password" class="form-control" id="exampleInputPassword1" />
                </div>
                <button value="register" /*onClick={postData}*/ name="signup" type="submit" class="btn btn-primary">SignUp</button>
                  . Already have an account ? <Link to='/login'>SIGN IN</Link>
            </form>
        </div>
    )
}

export default SignUp
