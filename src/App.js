import React, { useState, useEffect } from "react";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import "./App.css";
import firebase from "firebase";
import Nav from "./components/Nav";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => setUser(user));
  });

  return (
    <div className="App">
      <div id={user ? "userTitle" : "title"}>Daytona Gang</div>
      {user ? (
        <>
          <Dashboard userFirebase={user} />
        </>
      ) : (
        <SignIn setUser={setUser} user={user} />
      )}
    </div>
  );
}

export default App;
