import React, { useEffect, useState } from "react";
import firebase from "firebase";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Draft from "./Draft";
import Schedule from "./Schedule";
import Nav from "./Nav";

function Dashboard({ userFirebase }) {
  const [schedule, setSchedule] = useState([]);
  const [user, setUser] = useState({});

  async function fetchData() {
    axios
      .get("http://localhost:5000/events/")
      .then(function (res) {
        setSchedule(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // async function fetchUser() {
  //   axios
  //     .get(`http://localhost:5000/users.uid.${userFirebase.uid}`)
  //     .then(function (res) {
  //       console.log(res);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  async function getPostUser() {
    let user = {
      uid: userFirebase.uid,
      name: userFirebase.displayName,
      brackets: [],
    };
    axios
      .get(`http://localhost:5000/users/${userFirebase.uid}`)
      .then((res) => {
        if (res.data === null) {
          axios
            .post("http://localhost:5000/users/add", user)
            .then(function (res) {
              console.log("user added", res);
            })
            .catch(function (error) {
              console.log(error);
              setUser(res.data);
            });
        }
        console.log("user found", res);
        setUser(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getPostUser();
  }, [userFirebase.uid]);

  console.log(user);

  if (userFirebase.uid) {
    return (
      <div className="Dashboard">
        <Router>
          Welcome {userFirebase.displayName}
          <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
          {/* <button onClick={()=> postSchedule()}>add</button> */}
          <Switch>
            <Route
              exact
              path="/dashboard/"
              render={(props) => <Home {...props} user={userFirebase} />}
            />
            <Route
              exact
              path="/dashboard/draft"
              render={(props) => <Draft {...props} user={userFirebase} />}
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
