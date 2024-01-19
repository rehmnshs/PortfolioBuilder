import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config()

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// Repeat for other environment variables

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.SERVER_FA_KEY,
  authDomain: process.env.SERVER_FAUTHDOMAIN_KEY,
  projectId: process.env.SERVER_FPID_KEY,
  storageBucket: process.env.SERVER_FS_KEY,
  messagingSenderId: process.env.SERVER_FMSI_KEY,
  appId: process.env.SERVER_FAPPID_KEY,
  measurementId: process.env.SERVER_FMID_KEY
};



// Initialize Firebase
const appF = initializeApp(firebaseConfig);
const auth = getAuth(appF);
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("nuh nuh");
});

app.post("/signup", async (req, res) => {
  try {
    const email = req.body.email;
    const pass = req.body.pass;
    var uid  = '';
  const user = await createUserWithEmailAndPassword(
      auth,
      email,
      pass
    )


    console.log(user.user.uid);
    const cookieValues ={
      uid:user.user.uid,
      email:user.user.email,
    }
    const serializedValues = JSON.stringify(cookieValues);

    res.send(encodeURIComponent(serializedValues));

  } catch (err) {
    console.log(err);
  }
});

app.post("/signin", async (req, res) => {
  try {
    const email = req.body.email;
    const pass = req.body.pass;
    var uid  = '';
  const user = await signInWithEmailAndPassword(
      auth,
      email,
      pass
    )


    console.log(user.user.uid);
    const cookieValues ={
      uid:user.user.uid,
      email:user.user.email,
    }
    const serializedValues = JSON.stringify(cookieValues);

    res.send(encodeURIComponent(serializedValues));

  } catch (err) {
    console.log(err);
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
