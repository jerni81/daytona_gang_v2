import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/dashboard",
  // We will display Email as auth providers.
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};

function SignIn({ user }) {
  console.log("sign in user", user);

  return (
    <div className="SignIn">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignIn;
