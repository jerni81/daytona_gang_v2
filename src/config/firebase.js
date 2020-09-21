import app from "firebase/app";
import "firebase/auth";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCH2vWg_fwzwNNjBePmJyaLatopJu5rzCU",
  authDomain: "daytona-gang-v2.firebaseapp.com",
  databaseURL: "https://daytona-gang-v2.firebaseio.com",
  projectId: "daytona-gang-v2",
  storageBucket: "daytona-gang-v2.appspot.com",
  messagingSenderId: "270690783616",
  appId: "1:270690783616:web:de4d682dd41c4f181c3165",
  measurementId: "G-VPZY3LSN89",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.database = firebase.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        return this.database
          .ref("users/" + authUser.user.uid)
          .once("value")
          .then((user) => {
            return user.val();
          });
      });
  };

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;
