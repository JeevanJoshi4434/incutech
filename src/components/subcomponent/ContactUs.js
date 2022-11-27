import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../css/contactus.css"
const ContactUs = () => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [massage, setMassage] = useState('');
    const ContactUsNow = async (e) => {
        e.preventDefault();
    const res = await fetch(`/api/contactus`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            massage
        })

    });
    const json = await res.json()
    if (json.success) {
        // redirect
        window.alert("Submited Successfully");
        history.go(0);
    } else {
        window.alert("Only admin is Allowed !");
    }
}
return (
    <div className='contact-body'>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label contact-item">Email address</label>
            <input type="email" class="form-control contact-item"  onChange={(e) => setEmail(e.target.value)} value={email} id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label contact-item">Text area</label>
            <textarea class="form-control contact-item" onChange={(e) => setMassage(e.target.value)} value={massage} id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div className="modal-footer">
            <Link to="/"><button type="button" className="btn btn-secondary mx-3" data-bs-dismiss="modal">Go to home</button></Link>
            <button type="button" className="btn btn-primary" onClick={ContactUsNow}>Submit</button>
        </div>
    </div>
)
}

export default ContactUs
