import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import EngineerView from "./components/EngineerView";
import TpmView from "./components/TpmView";
import EngineerList from "./components/EngineerList";
import TpmList from "./components/TpmList";

function App() {
  return (
    <Router>
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
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Me</a>
        </li>

        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/engineer"]} component={EngineerList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/engineer/:id" component={EngineerView} />
          <Route path="/tpm/:id" component={TpmView} />
          <Route path="/tpm/" component={TpmList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
