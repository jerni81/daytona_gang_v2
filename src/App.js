import React, { useState, useEffect } from "react";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import Schedule from "./components/Schedule";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase";

function App() {
  const [user, setUser] = useState("none");
  const [schedule, setSchedule] = useState({});

  async function fetchData() {
    const res = await fetch(
      "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nascar-t3/mc/2020/races/schedule.json?api_key=pkgdvzk982juwdv4x7uuuxhw"
    );
    res
      .json()
      .then((res) => setSchedule(res))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => setUser(user));
  });

  console.log("App user", user);
  console.log(schedule);

  return (
    <div className="App">
      <div id="title">Daytona Gang</div>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <SignIn {...props} setUser={setUser} user={user} />
            )}
          />
          <Route
            path="/dashboard"
            render={(props) => <Dashboard {...props} user={user} />}
          />
          <Route
            path="/schedule"
            render={(props) => <Schedule {...props} schedule={schedule} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
