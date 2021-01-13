import React from "react";

import "./App.css";
// firebase stuffs
//import firebase config and firebase database
import {firebaseConfig} from "./utils/config";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// components
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./pages/Home";

//initlizeing firebase app with the firebase config which are in ./utils/firebaseConfig
//: initialize FIREBASE
firebase.initializeApp(firebaseConfig);

const App = () => {
 
  return (
    <div>      
    <Header/>
    <Home/>
    <Footer/>            
   </div>
        );
};

export default App;
