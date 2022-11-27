import React from 'react'
import { useHistory } from 'react-router-dom';
import './css/Nav.css';
import { Link } from 'react-router-dom';
import imgLogo from './images-clipart/LOGO.png';

const Nav = () => {
  let history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/logout", {
      method: 'GET',
    });
    const json = await res.json()
    if (json.success) {
      // redirect
      localStorage.removeItem('token', json.token);
      window.alert("logout Successfully");
      history.push("/login");
      history.go(0);
    } else {
      window.alert("Network Error");
    }
  }


  return (
    <>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <Link className="navbar-brand" to="/"><img alt="Incubator" src={imgLogo} style={{ height: "50px", weight: "50px" }} /></Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav navWidth">
              <Link className="nav-link active  blue" aria-current="page" to="/events"><span className='blue'>Events</span></Link>
              <Link className="nav-link active  blue" to="/courses"><span className=' blue'>Course</span></Link>
              {!localStorage.getItem('user', 'jwt') ? <form className="d-flex">
                {/* <Link className="btn btn-primary mx-2 dropdown-item" to="/signup" role="button">Get Started</Link> */}
              </form> :
                <div className='nav-link d-flex'>
                  <li><Link className="nav-item mx-1" to="/collageteams">College Teams</Link></li>
                  <li><Link className="nav-item mx-1" to="/yourteam">Your team</Link></li>
                </div>
              }
            </div>
            <div className='d-flex '>
              {!localStorage.getItem('token') ? <form className="d-flex">
                <Link className="btn btn-primary mx-2 dropdown-item" to="/signup" role="button">Get Started</Link>
              </form> :
                <div className='nav-link d-flex '>
                  <p className="nav-item mx-2 my-4 navLeft blue" onClick={handleLogout}>Logout</p>
                </div>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
