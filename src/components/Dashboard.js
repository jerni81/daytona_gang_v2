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
  const [nextEvent, setNextEvent] = useState({});

  // calls to MongoDB back end to retrieve list of events and sets schedule
  async function getSchedule() {
    axios
      .get("http://localhost:5000/events/")
      .then(function (res) {
        setSchedule(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // seaches through schedule by date and finds which event will occur next
  // sets state to have neccesary info about the next event
  function getNextEvent() {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    for (let i = 0; i < schedule.length; i++) {
      if (schedule[i].start_date >= date) {
        setNextEvent({
          name: schedule[i].name,
          raceName: schedule[i].races[0].name,
          startTime: schedule[i].races[0].scheduled,
          raceID: schedule[i].races[0].id,
        });
        return;
      }
    }
  }

  // Assumes user exist and gets the user object from MongoDB
  // If no user is found then posts a new user object to Mongo
  // sets state to user object
  async function getPostUser() {
    axios
      .get(`http://localhost:5000/users/${userFirebase.uid}`)
      .then((res) => {
        if (res.data === null) {
          let user = {
            uid: userFirebase.uid,
            name: userFirebase.displayName,
            brackets: [],
          };
          axios
            .post("http://localhost:5000/users/add", user)
            .then(function (res) {
              // console.log("user added", res);
              setUser(res.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        // console.log("user found", res);
        setUser(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getSchedule();
  }, []);

  useEffect(() => {
    getPostUser();
  }, [userFirebase.uid]);

  useEffect(() => {
    getNextEvent();
  }, [schedule]);

  // console.log(nextEvent);
  // if(nextEvent.startTime){
  // console.log(nextEvent.startTime.split("T")[0] == "2020-10-18");
  // }
  // console.log(schedule);

  if (userFirebase.uid) {
    return (
      <div className="Dashboard" data-testid="Dashboard">
        <Router>
          Welcome {userFirebase.displayName}
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
              render={(props) => (
                <Draft {...props} user={user} nextEvent={nextEvent} />
              )}
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
