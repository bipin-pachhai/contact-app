import React, { useContext, useEffect } from "react";
import { Container,Button } from "reactstrap";
// react toastify stuffs
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

// context api stuffs
// import reducers and contexts
import { useHistory } from "react-router-dom";
import {ContactContext} from "./context/Context";
import {SET_CONTACT, SET_LOADING, SET_USER} from "./context/action.types";
//initlizeing firebase app with the firebase config which are in ./utils/firebaseConfig
//: initialize FIREBASE
firebase.initializeApp(firebaseConfig);

// first state to provide in react reducer
const initialState = {
  user :  null,
  userPhoto: null,
  contacts: [],
  contact: {},
  contactToUpdate: null,
  contactToUpdateKey: null,
  isLoading: false
};

const App = () => {
  const { state, dispatch } = useContext(ContactContext);
  const {user} = state;
  const history = useHistory();
  // will get contacts from firebase and set it on state contacts array


  
  const handleSubmit = (e)=>{
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          dispatch({
              type: SET_USER,
              payload: result.user?.displayName
          });

          history.push("/contacts");

          
    
        })
        .catch((error) => {
         console.log(error);
        });

       
        
    
  

    
   
  }





  return (
    <Container>
      
        <ToastContainer />
        <Header />
        
        <div>
      <h1> Welcome Aboard! Please sign in to view your contacts.</h1>
      <Button type = "secondary" onClick = {handleSubmit}>Sign in using google account</Button>
      </div>
       

        <Footer />
      
      </Container>
        );
};

export default App;
