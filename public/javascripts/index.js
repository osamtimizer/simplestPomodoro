import $ from 'jquery';
import firebase from 'firebase'

let config = {
  apiKey: "AIzaSyDUBdU1s_1ff_yUxXvlCbS9y4JyocdaShk",
  authDomain: "simplestpomodoro.firebaseapp.com",
  databaseURL: "https://simplestpomodoro.firebaseio.com",
  storageBucket: "simplestpomodoro.appspot.com",
};
firebase.initializeApp(config);

const auth = firebase.auth();
const database = firebase.database();

$(() => {
  auth.onAuthStateChanged((user) => {
    $("p#error_message").text();
    if (user) {
      //user is logged in
      const uid = user.uid;
      console.log("uid: ", uid);
      let _displayName = "";
      const ref = database.ref('users/' + uid + '/profile');
      ref.once('value').then((snapshot) => {
        const displayName = snapshot.child('displayName').val();
        console.log("DisplayName: ", displayName);
        const displayText= "logged in as: " + displayName;
        $("#username").text(displayText);
      }).catch((err) => {
        console.error("Error: ", err);
        return;
      });

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
      $("#username").text("");
      $("button#logout").hide();
    }
  });

});

let initializeComponent = () => {
  $("button.auth").click((event) => {
    //authentication settings
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log(result);
      console.log("success login");
      var token = result.credential.accessToken;
      var user = result.user;
      var ref = database.ref('users');
      //usersの中にuidと一致するものがなかったら新規追加する
      ref.once('value').then((snapshot) => {
        if (snapshot.hasChild(user.uid)) {
          //nothing to do
        } else {
          console.log("New user");
          const userRef = ref.child(user.uid);
          userRef.set({
            profile: {
              displayName: user.displayName,
              accessToken: token,
              expire: 24
            },
            pomodoro: {
              remain: 60 * 25 * 1000,
              terms: 4,
              isWorking: true
            }
          });
        }
        return true;
      }).catch((err) => {
        console.error("Error: ", err);
      });
    }).catch((err) => {
      console.error("Error: Authentication failed with ", err.message);
      $("p#error_message").text(err.message);
    });
  });

  $("button#logout").click((event) => {
    auth.signOut();
  });
}

