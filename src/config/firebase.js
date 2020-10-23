import app from "firebase/app";
import "firebase/auth";
import firebase from "firebase";
require('dotenv').config()

const firebaseConfig = {
  apiKey: process.env.KEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET, 
  messagingSenderId: process.env.MESSAGINGIDSENDER,
  appId: process.env.APPID,
  measurementId: process.env.MEASURMENTID,
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
