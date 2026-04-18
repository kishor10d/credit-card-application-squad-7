import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Header = () => {

  const navigate = useNavigate();

  const isAuthenticated = authService.isAuthenticated();
	console.log("isAuth", isAuthenticated);
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  // console.log(user);
  // console.log(currentUser);

  const logout = () => {
    authService.logout();
    navigate('/login');
  }

  return(
    <>
    <header>
      <nav
        className="navbar navbar-expand navbar-dark bg-primary"
        aria-label="Second navbar example"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            HCL CC Application
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample02"
            aria-controls="navbarsExample02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample02">
            <ul className="navbar-nav me-auto">
              
              { !isAuthenticated &&
              <>
              <li className="nav-item">
                <NavLink key='/' to="/" className="nav-link active">Home</NavLink>
              </li>
              <li className="nav-item active d-flex">
                <NavLink key='/login' to="/login" className="nav-link active d-flex">Login</NavLink>
              </li>
              </>
              }
              { isAuthenticated &&
              <>
              <li className="nav-item">
                <NavLink key='/dashboard' to="/dashboard" className="nav-link active">Dashboard</NavLink>
              </li>
              <li className="nav-item active d-flex">
                <button onClick={logout} className="nav-link active d-flex">Logout <span > ({user?.name})</span></button>
              </li>
              </>

              }
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <br />
    </>
  )
};

export default Header;
