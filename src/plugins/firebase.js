import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyD9SfLTMFNbC4_hv7Dv5sa53-sNpfbcCWg",
    authDomain: "codebites-web.firebaseapp.com",
    databaseURL: "https://codebites-web.firebaseio.com",
    projectId: "codebites-web",
    storageBucket: "codebites-web.appspot.com",
    messagingSenderId: "466972691199",
    appId: "1:466972691199:web:81173d0a8024a6a5381aca",
    measurementId: "G-3BMXRFTE2H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
const listingsCollection = db.collection('listings')
const usersCollection = db.collection('users')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    listingsCollection,
    usersCollection,
    // postsCollection,
    // commentsCollection,
    // likesCollection
}