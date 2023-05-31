import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAXYKBrSmhciuKepIR-PnPngG7kqWhUDK0",
  authDomain: "examen-firebase-d74d4.firebaseapp.com",
  databaseURL: "https://examen-firebase-d74d4-default-rtdb.firebaseio.com",
  projectId: "examen-firebase-d74d4",
  storageBucket: "examen-firebase-d74d4.appspot.com",
  messagingSenderId: "872827728719",
  appId: "1:872827728719:web:f9decfa58ee75d32d74b3a"
};


const app = initializeApp(firebaseConfig);
const fireDb = getDatabase(app);


export {fireDb};