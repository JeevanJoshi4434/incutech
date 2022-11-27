import React from 'react'
import './css/admin.css'
import Card from './subcomponent/Card'
import CardEvent from './subcomponent/CardEvent'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Admin = () => {
    const history = useHistory();
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [onDate, setonDate] = useState('');
    const [Event_ID, setID] = useState('');
    const [CollageName, setCollageName] = useState('');
    const [cName, setcName] = useState('');
    const [data, setData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [Course_ID, setCourseID] = useState('');
    const [fromDate, setfromDate] = useState('');
    const [toDate, settoDate] = useState('');
    const [allUsers, setallUsers] = useState([]);




    const uploadEvent = async (e) => {
        e.preventDefault();

        const res = await fetch(`/api/admin/create-event/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Title,
                Description,
                onDate,
                Event_ID,
                cName
            })

        });
        const json = await res.json()
        if (json.success) {
            // redirect
            window.alert("Uploaded Successfully");
            history.go(0);
        } else {
            window.alert("Only admin is Allowed !");
        }
    }
    const uploadCourse = async (e) => {
        e.preventDefault();

        const res = await fetch(`/api/course/admin/create-course`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                description,
                Course_ID,
                CollageName,
                toDate,
                fromDate
            })

        });
        const json = await res.json()
        if (json.success) {
            // redirect
            window.alert("Uploaded Successfully");
            history.go(0);
        } else {
            window.alert("Only admin is Allowed !");
        }
    }
    // useEffect(() => {
    // /        dispatch(getProducts());
    // }, [dispatch]);

    // const [event, setEvent] = useState('');
    const fetchEvent = () => {
        fetch(`/api/events`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data)
            setData(data)
        })
    }
    useEffect(() => {
        fetchEvent();
    }, []);
    const fetchCourse = () => {
        fetch(`/api/courses`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            return response.json();
        }).then((file) => {
            // //(file)
            setCourseData(file)
        })
    }
    useEffect(() => {
        fetchCourse();
    }, []);
    
    const fetchallUsers = () => {
        fetch(`/api/admin/user`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            return response.json();
        }).then((allUsers) => {
            setallUsers(allUsers)
        })
    }
    useEffect(() => {
        fetchallUsers();
    }, []);
    let number = 1;
    // useEffect(() => {
    //   const fetchdata = async ()=>{
    //     const data = await axios.get(`/api/events`);
    //     //(data);
    //     setData(data);
    //   };
    //   fetchdata();
    // }, []);
    // //(data)


    return (
        <>
            <div className='Admin-Panel'>
                <div className='admin-nav'>
                    <div className='course-modal'>
                        {/* course modal */}
                        <div className='course-modal'>
                            {/* <!-- Button trigger modal --> */}
                            <p data-bs-toggle="modal" data-bs-target="#exampleModal1">Create Course</p>

                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Course</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Title</label>
                                                <input type="text" onChange={(e) => settitle(e.target.value)} name="name" value={title} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">CollegeName</label>
                                                <input type="text" onChange={(e) => setCollageName(e.target.value)} name="name" value={CollageName} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Course ID</label>
                                                <input type="text" onChange={(e) => setCourseID(e.target.value)} name="name" value={Course_ID} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Description</label>
                                                <input type="text" onChange={(e) => setdescription(e.target.value)} name="name" value={description} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">From Date:</label>
                                                <input type="text" onChange={(e) => setfromDate(e.target.value)} name="name" value={fromDate} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">To Date:</label>
                                                <input type="text" onChange={(e) => settoDate(e.target.value)} name="name" value={toDate} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={uploadCourse}>Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='event-modal'>
                        {/* Event modal */}
                        <div className='course-modal'>
                            {/* <!-- Button trigger modal --> */}
                            <p data-bs-toggle="modal" data-bs-target="#exampleModal2">Create Event</p>

                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Event</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Title</label>
                                                <input type="text" onChange={(e) => setTitle(e.target.value)} name="name" value={Title} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Event ID</label>
                                                <input type="text" onChange={(e) => setID(e.target.value)} name="name" value={Event_ID} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Description</label>
                                                <input type="text" onChange={(e) => setDescription(e.target.value)} name="name" value={Description} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">College Name</label>
                                                <input type="text" onChange={(e) => setcName(e.target.value)} name="name" value={cName} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">onDate</label>
                                                <input type="text" onChange={(e) => setonDate(e.target.value)} name="name" value={onDate} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={uploadEvent} >Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p data-bs-toggle="modal" data-bs-target="#exampleModaluser">View all users</p>

                    <div className="modal fade" id="exampleModaluser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">All users detail</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                {allUsers.users?.map((i) => {
                                    return(
                                        // //(i)
                                        <div>
                                        <ol>{number++} {i.name} <span>{i.Collage_name}</span> {i.Student_Id}<span> {i.role} </span> {i.team} </ol>
                                        </div>
                                )})}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>Team</p>{ /**Under construction*/}

                </div>

                <div className='uploaded-section'>
                    <div className='eventList'>
                        {courseData.course?.map((i) => {
                            return (
                                <Card className="eventCard" Title={i.title} Description={i.description} collageName={i.CollageName} EventID={i._id} endDate={i.toDate} />
                            )
                        })}
                    </div>
                    <div className='eventList'>
                        {data.events?.map((event) => {
                            return (
                                <CardEvent className="eventCard" collageName={event.cName} Title={event.Title} Description={event.Description} onDate={event.onDate} EventID={event._id} />
                            )
                        })}
                    </div>

                    {/* <div className='event'><CardEvent Title={"Java"} Description={"Description"} onDate={"27 Apr"} /></div> */}
                </div>

            </div>
        </>
    )
}

export default Admin
