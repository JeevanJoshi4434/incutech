import React from 'react'
import img from "./images-clipart/404_Not_Found.png"
import { Link } from 'react-router-dom'
const MyTeam = () => {
  return (
    <div className='align-item-center'>
      <img src={img} style={{height:"300px", width: "300px"}}/>
    <h1>Under Construction</h1>
    <h6><Link to='/'>GO Back</Link></h6>
    </div>
  )
}

export default MyTeam
