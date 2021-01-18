import React, { useContext} from "react";
import GoogleLogin from 'react-google-login';
// react toastify stuffs
import {  toast } from "react-toastify";
import {Button} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
// firebase stuffs
import firebase from "firebase/app";

// context api stuffs
// import reducers and contexts
import { useHistory } from "react-router-dom";
import {ContactContext} from "../context/Context";
import { SET_PP, SET_USER} from "../context/action.types";



const Home = () => {
  const {state, dispatch } = useContext(ContactContext);
  const {user} = state;

  const history = useHistory();

  const viewContact = (e)=>{
    e.preventDefault();
    if(user){
      history.push("/contacts")
    }
  }
  
  //Sign in User
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
     <div >
       {user ? (<>
     <h1 className = "text-center"> Welcome to the Home Page!</h1><br/><h2> You are currently signed in as {user}.</h2>
     <div  className = "buttonCenter" >
       <Button variant="contained" color ="link" onClick = {viewContact}> <h2>View Contact Lists</h2></Button>
     </div>
       </>
       ):
       (
      <> 
      <h1 className ="text-center"> Welcome Aboard! Please sign in to view your contacts.</h1>
      <div  className = "buttonCenter" onClick = {handleSubmit}>
      <GoogleLogin
          buttonText="Sign in with Google account"
      />
      </div>
      </>
     
      )
      }
      </div>
   
    
        );
};

export default Home;
