import firebase from '@firebase/app';
import "@firebase/auth";
import "@firebase/database";
import "@firebase/storage";

var config = {
    apiKey: "AIzaSyD_UzWE5Rd9Q3xe3gxqzaRW8KJB5QAN8YM",
    authDomain: "react-stalker.firebaseapp.com",
    databaseURL: "https://react-stalker.firebaseio.com",
    projectId: "react-stalker",
    storageBucket: "react-stalker.appspot.com",
    messagingSenderId: "831254600060"
  };
  firebase.initializeApp(config);


  export default firebase;