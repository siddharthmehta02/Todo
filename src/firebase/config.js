import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCgoDL4I7TQPpeiM-BZ4q7CG6R12PRFt6M",
  authDomain: "to-do-list-sid-nis.firebaseapp.com",
  projectId: "to-do-list-sid-nis",
  storageBucket: "to-do-list-sid-nis.appspot.com",
  messagingSenderId: "548346037332",
  appId: "1:548346037332:web:71ded35d1ea057b1dc19c1",
  measurementId: "G-L2KY1QMJ9D"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };