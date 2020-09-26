import firebase from 'firebase';
 
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCLf_qTkVFpT5H-5_hIHaZo5wAnRvpLDTM",
    authDomain: "real8-c6e65.firebaseapp.com",
    databaseURL: "https://real8-c6e65.firebaseio.com",
    projectId: "real8-c6e65",
    storageBucket: "real8-c6e65.appspot.com",
    messagingSenderId: "718291636854",
    appId: "1:718291636854:web:a4e1c41ca4528aa511c557",
    measurementId: "G-1BN8Q9TVN4"
  };
  // Initialize Firebase
  const fire =  firebase.initializeApp(firebaseConfig);

  export default fire;