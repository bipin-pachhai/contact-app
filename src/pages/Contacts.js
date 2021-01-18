import React, { useContext } from "react";
import {Container, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import Contact from "../components/Contact";
import { MdAdd } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { ContactContext } from "../context/Context";
import {CONTACT_TO_UPDATE} from "../context/action.types";
import { ToastContainer,toast } from "react-toastify";
//components
import Header from "../layout/Header";
import App from "../App";
import Footer from "../layout/Footer";

const Contacts = () => {
  const { state, dispatch } = useContext(ContactContext);

  // destructuring user, contacts and isLoading from state
  const {user, contacts, isLoading } = state;

  // history hooks from react router dom to get history
  const history = useHistory();

/*
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

*/
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
    
     (!user) ? ( history.push("/"),
     <App/>) :
     (
      
    <>
    <Header/>
     
    <Container className="mt-4">  
      <h3 className = "mb-3">Welcome, {user}</h3> 
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
    <Footer/>
    </>
   )   
  );
};

export default Contacts;
