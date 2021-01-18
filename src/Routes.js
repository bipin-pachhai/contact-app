// react-router-dom3
import React , {useEffect, useReducer} from "react";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import reducer from "./context/reducer";
import {SET_USER, SET_PP, SET_LOADING, SET_CONTACT} from "./context/action.types"
import {ContactContext} from "./context/Context";
//components
import App from "./App";
import AddContact from "./pages/AddContact";
import Contacts from "./pages/Contacts";
import PageNotFound from "./pages/PageNotFound";
import ViewContact from "./pages/ViewContact";
// firebase stuffs
import {firebaseConfig} from "./utils/config";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
//: initialize FIREBASE
firebase.initializeApp(firebaseConfig);

//Initial State of the Application
const initialState = {
    user :  null,
    userPhoto: "",
    contacts: [],
    contact: {},
    contactToUpdate: null,
    contactToUpdateKey: null,
    isLoading: false
  };


  

const Routers = ()=>{

    const [state, dispatch] = useReducer(reducer, initialState);
    const {user} = state;
    

    //fetch contacts
    const getContacts = async () => { 
    // : load existing data
      dispatch({
      type: SET_LOADING,
      payload: true
        });
      const contactsRef = await firebase.database().ref(`contacts/${user}`);
         contactsRef.on('value', snapshot =>{
            dispatch({
               type: SET_CONTACT,
              payload: snapshot.val()
              });
    
             dispatch({
               type: SET_LOADING,
              payload: false
      });
    });

  };


  useEffect(
      ()=>{    
        firebase.auth().onAuthStateChanged( user =>{
          if(user){
           
          dispatch({
            type: SET_USER,
            payload: user.displayName
    
          });
          dispatch({
            type: SET_PP,
            payload: user.photoURL
          });

          getContacts();
 
    
        }
        
        })
      }
      ,[user]); 
      

    return(
        <Router>
          
           <ContactContext.Provider value = {{state, dispatch}}>
            
            <Switch>
              <Route exact path="/contact/add" component={AddContact} />
              <Route exact path="/contact/view" component={ViewContact} />
              <Route exact path="/contacts" component={Contacts} />
              <Route exact path="/" component={App} />
              <Route exact path="*" component={PageNotFound} />
            </Switch> 
            </ContactContext.Provider>
        </Router>

    );
}

export default Routers;