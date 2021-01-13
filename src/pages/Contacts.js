import React, { useContext, useEffect } from "react";
import firebase from "firebase/app";
import {Button, Container, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import Contact from "../components/Contact";
import { MdAdd } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { ContactContext } from "../context/Context";
import {SET_CONTACT,SET_LOADING ,CONTACT_TO_UPDATE, REMOVE_USER} from "../context/action.types";
import { ToastContainer,toast } from "react-toastify";
import Header from "../layout/Header";

const Contacts = () => {
  const { state, dispatch } = useContext(ContactContext);

  // destructuring user, contacts and isLoading from state
  const {user, contacts, isLoading } = state;

  // history hooks from react router dom to get history
  const history = useHistory();


  const getContacts = async () => {
    // : load existing data
    dispatch({
      type: SET_LOADING,
      payload: true
    })
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

  // getting contact  when component did mount
  useEffect(() => {
    //: call methods if needed
    getContacts()
  }, [] );

  const handleSubmit = (e)=>{
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      dispatch({
        type: REMOVE_USER,
      });
      history.push("/");
    
     
    }).catch((error) => {
      // An error happened.
      console.log(error);
      toast("Sign out Failed!!", {type: "warning"});
    });

   


  }


  // handle fab icon button click
  // will set in state of the contact to update and send it to the contact/add route
  const AddContact = () => {
    //: use dispatch to send user to add contact screen
    dispatch({
      type: CONTACT_TO_UPDATE,
      payload: null,
      key: null
    });
    history.push("/contact/add");
  };

  // return loading spinner
  if (isLoading) {
    return (
      <div className="Center">
        <Spinner color="primary" />
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <>
    <Header/>
     
    <Container className="mt-4">  
      { user ? <h1>Welcome, {user}</h1>: <h1></h1>}
      <Button onClick = {handleSubmit}> Use another account</Button>
      <ToastContainer />
      {/* : Loop through FIREBASE objects  */}
      {
        (contacts.length === 0 && !isLoading) ?
        ( 
          <div className = " Center text-large text-primary">No Contacts added yet!</div>
        ):
        (
          <ListGroup>
            
            {Object.entries(contacts).map(([key, value]) => (
              <ListGroupItem key ={key}>
                <Contact contact ={value} contactKey = {key} />       
              </ListGroupItem>
            )
            )
            }
          </ListGroup>
        
          )
      }
      <MdAdd className="fab icon" style={{width:85, height: 85}} onClick={AddContact} />
    </Container>
    </>
  
   
  )
};

export default Contacts;
