import React, { useState, useEffect } from "react";
import Landing from "./components/Landing";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div id="title">Daytona Gang</div>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
