import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Draft from "./Draft";
import Schedule from "./Schedule";
import Nav from "./Nav";

function Dashboard({ user }) {
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

  console.log(schedule);

  if (user) {
    return (
      <div className="Dashboard">
        <Router>
          Welcome {user.displayName}
          <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
          <Switch>
            <Route
              exact
              path="/dashboard/"
              render={(props) => <Home {...props} user={user} />}
            />
            <Route
              exact
              path="/dashboard/draft"
              render={(props) => <Draft {...props} user={user} />}
            />
            <Route
              exact
              path="/dashboard/schedule"
              render={(props) => <Schedule {...props} schedule={schedule} />}
            />
          </Switch>
          <Nav />
        </Router>
      </div>
    );
  }
}

export default Dashboard;
