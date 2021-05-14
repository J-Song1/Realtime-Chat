import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCB36XJmF92eX_CwCdHjEB-ICEhb03s68o",
  authDomain: "realtime-chat-2b006.firebaseapp.com",
  projectId: "realtime-chat-2b006",
  storageBucket: "realtime-chat-2b006.appspot.com",
  messagingSenderId: "301123799965",
  appId: "1:301123799965:web:1597fac0ccb47347517d74",
  measurementId: "G-3SGBLMT29H",
};

const app = firebase.initializeApp(firebaseConfig);

const firestore = app.firestore();
export const database = {
  users: firestore.collection("users"),
};

export const storage = app.storage();
export const auth = app.auth();

export default app;
