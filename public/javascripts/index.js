import $ from 'jquery';
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDUBdU1s_1ff_yUxXvlCbS9y4JyocdaShk",
  authDomain: "simplestpomodoro.firebaseapp.com",
  databaseURL: "https://simplestpomodoro.firebaseio.com",
  storageBucket: "simplestpomodoro.appspot.com",
};
firebase.initializeApp(config);

const auth = firebase.auth();

$(() => {
  auth.onAuthStateChanged((user) => {
    $("p#error_message").text();
    if (user) {
      //user is logged in
      const displayName= user.displayName;
      const displayText= "logged in as: " + displayName;
      $("#username").text(displayText);

      fetch("pomodoro.html").then((res) => {
        console.log("Fetch is called");
        return res.text();
      }).then((text) => {
        console.log(text);
        $("div.body").html(text);
      }).catch((err) => {
        console.error("Error: ", err);
        $("p#error_message").text(err.message);
      });
      $("button#logout").show();

    } else {
      //user isn't logged in
      $("div.body").html('<button class="auth">auth</button>');
      initializeComponent();
      $("#username").text();
      $("button#logout").hide();
    }
  });

  initializeComponent();
});

let initializeComponent = () => {
  $("button.auth").click((event) => {
    //authentication settings
    var provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);
    firebase.auth().signInWithPopup(provider).then((result) => {
      var token = result.credential.accessToken;
      var user = result.user;

    }).catch((err) => {
      console.error("Error: Authentication failed with ", err.message);
      $("p#error_message").text(err.message);
    });
  });

  $("button#logout").click((event) => {
    auth.signOut();
  });
}

