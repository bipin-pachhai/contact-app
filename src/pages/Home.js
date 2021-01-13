import React, { useContext} from "react";
import {Button } from "reactstrap";
import GoogleLogin from 'react-google-login';
// react toastify stuffs
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
// firebase stuffs
//import firebase config and firebase database

import firebase from "firebase/app";

// context api stuffs
// import reducers and contexts
import { useHistory } from "react-router-dom";
import {ContactContext} from "../context/Context";
import { SET_PP, SET_USER} from "../context/action.types";


const Home = () => {
  const { dispatch } = useContext(ContactContext);
  const history = useHistory();
  


  
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
          dispatch({
              type: SET_PP,
              payload: result.user?.photoURL

          });          
          history.push("/contacts");      
        })
        .catch((error) => {
         toast("Authentication Failed!", {type: "warning"});
        });
       
  }
  return (
    <div>    
     <div >
      <h1> Welcome Aboard! Please sign in to view your contacts.</h1>
      <div  className = "buttonCenter" onClick = {handleSubmit}>
      <GoogleLogin
          buttonText="Sign in using google account"
      />
      </div>
      </div>
    </div>
        );
};

export default Home;
