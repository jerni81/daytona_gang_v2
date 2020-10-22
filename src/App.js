import React, { useState, useEffect } from "react";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import "./App.css";
import firebase from "firebase";

function App() {
  const [userFirebase, setUserFirebase] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => setUserFirebase(user));
  });

  return (
    <div className="App">
      <div id={user ? "userTitle" : "title"}>Daytona Gang</div>
      {user ? (
        <>
          <Dashboard userFirebase={userFirebase} />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default App;
