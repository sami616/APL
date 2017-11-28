import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDbXavpgG4vi-Jk2d2xPt62rJ8F8H5geNA",
  authDomain: "wp-project-launcher.firebaseapp.com",
  databaseURL: "https://wp-project-launcher.firebaseio.com",
  projectId: "wp-project-launcher",
  storageBucket: "wp-project-launcher.appspot.com",
  messagingSenderId: "142350354785"
};

firebase.initializeApp(config);

export const rootRef = firebase.database().ref();
export const usersRef = rootRef.child('users');
export const settingsRef = rootRef.child('settings');
