import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import EngineerView from "./components/EngineerView";
import TpmView from "./components/TpmView";
import EngineerList from "./components/EngineerList";
import TpmList from "./components/TpmList";
import NavBar from "./components/NavBar";

function App() {



  return (
    <Router> 
    <NavBar/>
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
