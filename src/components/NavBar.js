import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const NavBar =(props) => {

    const addRequest = (props.name==="tpm"?"":"Add")

    return (

        <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/engineer" className="navbar-brand">
          Dashboard
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
        <div className="navbar-nav ml-auto">
       
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Profile</a>
        </li>

        </div>
      </nav>
    )


}

export default NavBar;