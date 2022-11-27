import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
const Card = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
    const [Student_ID, setStudent_ID] = useState('');
    const [title, setTitle] = useState('');
    const [CollageName, setCollageName] = useState('');
  const eventApply = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/courseregistrations`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,Student_ID,title,CollageName,
      })

    });
    const json = await res.json()
        if(json.success){
          
          // redirect
        window.alert("Registration Successfully");
          history.push("/courses");
          history.go(0);
        }else{
          window.alert(" User already registered");
        }
  };
  let { Title,Description, onDate, EventID,collageName,endDate } = props;
  return (
    <div className='event'>
      
      <div className="card my-0.5 mx-1" style={{ width: "20rem" }}>
        <div className="card-body">
          <h5 className="card-title">{Title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{onDate}</h6>
          <h6 className="card-subtitle mb-2 text-muted">College: {collageName}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Event/Course ID: {EventID}</h6>
          <h6 className="card-subtitle mb-2 text-muted">To:   {endDate}</h6>
          <p className="card-text">{Description}</p>
          <a data-bs-toggle="modal" data-bs-target="#exampleModalcourse">Enroll Now</a>
          {/* <a href="#" className="card-link"></a> */}
        </div>
      </div>
      <div className='event-modal'>
        {/* Event modal */}
        <div className='course-modal'>

          {/* <!-- Modal --> */}
          <div className="modal fade" id="exampleModalcourse" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <p className="modal-title fs-5" id="exampleModalLabel">Enrollment form</p>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Event ID</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} name="name"  value={title} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} name="name"  value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Student Id</label>
                    <input type="text"onChange={(e) => setStudent_ID(e.target.value)}  name="Student_ID"  value={Student_ID} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">College Name</label>
                    <input type="text"onChange={(e) => setCollageName(e.target.value)}  name="Student_ID"  value={CollageName} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    
                  </div>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" onClick={eventApply} className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Card
