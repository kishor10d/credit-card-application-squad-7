import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {

  return(
    <header>
      <nav
        class="navbar navbar-expand navbar-dark bg-primary"
        aria-label="Second navbar example"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            HCL CC Application
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample02"
            aria-controls="navbarsExample02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExample02">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <NavLink key='/' to="/" className="nav-link">Home</NavLink>
              </li>
              <li class="nav-item">
                <NavLink key='/login' to="/login" className="nav-link">Login</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
};

export default Header;
