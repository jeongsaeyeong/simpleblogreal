import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const firebaseConfig = {
    apiKey: "AIzaSyD77HAHrEoYnII0Jgmlp2StW9X8dWglzSg",
    authDomain: "react-blog-d6e25.firebaseapp.com",
    projectId: "react-blog-d6e25",
    storageBucket: "react-blog-d6e25.appspot.com",
    messagingSenderId: "761828531810",
    appId: "1:761828531810:web:8bcc905e1686888670bb3b"
};

firebase.initializeApp(firebaseConfig)

export default firebase;