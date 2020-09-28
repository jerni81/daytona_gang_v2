import React from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

function Dashboard({ user }) {
  let history = useHistory();

  if (user) {
    return (
      <div className="Dashboard">
        Welcome {user.displayName}
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
        <button onClick={() => history.push("/schedule")}>Schedule</button>
      </div>
    );
  }
  return <div className="Dashboard">{history.push("/")}</div>;
}

export default Dashboard;
