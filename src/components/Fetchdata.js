import React from 'react'
import { useState } from 'react';
import "./css/fetchdata.css"
import LokeshSingh from './images-clipart/volenteers/01.png';
import NiveditaBhatt from './images-clipart/volenteers/02.png';
import DiyaRathor from './images-clipart/volenteers/03.png';
import MitaliPandey from './images-clipart/volenteers/04.png';
import MokshitaJoshi from './images-clipart/volenteers/05.png';
import CardEvent from './subcomponent/CardEvent';
const options = ["Graphic Era Hill University Bhimtal", "Graphic Era Hill University Haldwani", "Graphic Era Deemed to be Dehradun"]

const Fetchdata = () => {

  const [selected, setSelected] = useState(options[0])

  const submit = () => {
    console.log(selected);
  };
  return (
    <>
      <form>
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {options.map((value) => {
            return (
              <option value={value} key={value}>{value}</option>
            )
          })}
        </select>
        <button type='button' onClick={submit}>Submit</button>
      </form>
      <div className='members'>
        <div className='d-flex justify-content-center'>
        <div className=''><h1>Volenteers</h1></div>
        </div>
        <div className='member d-flex'>
          <div className='member-image'>
            <img src={LokeshSingh} style={{width : "80px",height: "80px" }} alt="Lokesh Singh"/>
          </div>
          <div className='mx-1 d-flex justify-content-center flex-column flex-wrap member-details'>
            <h6>Lokesh Singh</h6>
            <p>Volenteers</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Fetchdata
