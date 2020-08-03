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
const reviewsCollection = db.collection('reviews')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')

const getProfile = async (username) => {
    let snap = await usersCollection.where("username", "==", username).get();
    if (!snap.empty) {
        // this.listingId = snap.docs[]
        let profile = snap.docs[0].data();
        return {
            ...profile,
            get ratingPc() {
                if (!profile) return -1;
                if (!profile.rating) return 100;
                const {total, positive, negative} = profile.rating;
                const neutral = total - positive - negative;
                const weightedScore = positive + neutral*0.5;
                return ((weightedScore/total)*100).toFixed(0);
            },
            reviews: await getReviewsByUid(profile._id),
        }
    }
    return null;
}

const getProfileById = async (uid) => {
    let profile = (await usersCollection.doc(uid).get()).data();
    return {
        ...profile,
        get ratingPc() {
            if (!profile) return -1;
            if (!profile.rating) return 100;
            const {total, positive, negative} = profile.rating;
            const neutral = total - positive - negative;
            const weightedScore = positive + neutral*0.5;
            return ((weightedScore/total)*100).toFixed(0);
        },
        reviews: await getReviewsByUid(uid),
    };
}

async function getReviewsByUid(uid) {
    let snap = await reviewsCollection.where("for", "==", uid).get();
    return snap.docs.map(doc => doc.data());
}

export {
    db,
    auth,
    currentUser,
    listingsCollection,
    usersCollection,
    // postsCollection,
    // commentsCollection,
    // likesCollection,
    getProfile,
    getProfileById
}