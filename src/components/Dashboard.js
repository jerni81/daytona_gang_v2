import React, { useEffect, useState } from "react";
import firebase from "firebase";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Draft from "./Draft";
import Schedule from "./Schedule";
import Nav from "./Nav";
// import { use } from "../../backend/routes/events";

function Dashboard({ user }) {
  const [schedule, setSchedule] = useState({});

  // async function fetchData() {
  //   const res = await fetch(
  //     "https://cors-anywhere.herokuapp.com/http://api.sportradar.us/nascar-t3/mc/2020/races/schedule.json?api_key=pkgdvzk982juwdv4x7uuuxhw"
  //   );
  //   res
  //     .json()
  //     .then((res) => setSchedule(res))
  //     .catch((err) => console.log(err));
  // }

  // function postSchedule() {
  //   if(schedule.events){
  //   // for(let i = 0; i < schedule.events.length; i++){
  //     let events = schedule.events
  //     axios.post('http://localhost:5000/events', events)
  //     .then(res => console.log("from dash", res.data))
  //     .catch((err) => console.log(err));
  //   // }
  // }
  // }

  // useEffect(() => {
  //   fetchData();
  //   console.log('datafetched');
  // }, []);
 

 
  if(schedule.events){
  console.log(schedule.events.length);
  }

  if (user) {
    return (
      <div className="Dashboard">
        <Router>
          Welcome {user.displayName}
          <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
          {/* <button onClick={()=> postSchedule()}>add</button> */}
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
