import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import "./css/admin.css";
import "./css/AboutUs.css";
import CardEvent from './subcomponent/CardEvent';

const Course = () => {
 
  // collect course data
  const [courseData, setCourseData] = useState([]);
  // fetchCourse 
  const fetchCourse = () => {
    fetch(`/api/courses`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    }).then((response) => {
      return response.json();
    }).then((file) => {
      console.log(file)
      setCourseData(file)
    })
  }
  useEffect(() => {
    fetchCourse();
  }, []);
  
  return (
    <>
      <div className='sections'>
        <div className='profiles'>
          Courses :
          {courseData.course?.map((i) => {
            return (
              <CardEvent className="eventCard" Title={i.title} Description={i.description} collageName={i.CollageName} EventID={i._id} endDate={i.toDate} />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Course
