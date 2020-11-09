import firebase from "firebase/app"

import "firebase/auth"
import "firebase/database"

// ADD YOUR FIREBASE CONFIG OBJECT HERE:
var firebaseConfig = {
    apiKey: "AIzaSyCEI-2h8wasnKPbVLXHeBMXNZxQzWne0NY",
    authDomain: "maverick-71f0b.firebaseapp.com",
    databaseURL: "https://maverick-71f0b.firebaseio.com",
    projectId: "maverick-71f0b",
    storageBucket: "maverick-71f0b.appspot.com",
    messagingSenderId: "444684032472",
    appId: "1:444684032472:web:5dd98e2118037417af3aad"
}

let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }