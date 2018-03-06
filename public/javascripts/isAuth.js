import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDUBdU1s_1ff_yUxXvlCbS9y4JyocdaShk",
  authDomain: "simplestpomodoro.firebaseapp.com",
  databaseURL: "https://simplestpomodoro.firebaseio.com",
  storageBucket: "simplestpomodoro.appspot.com",
};
firebase.initializeApp(config);

firebase.auth().getRedirectResult().then((result) => {
  //TODO:How should I deal with this authentication?
  if(result.credential) {
    console.log("Authentication success");
  } else {
    console.log("credential is false, but not error");
  }
}).catch((error) => {
  console.error("Error: ", error);
});
