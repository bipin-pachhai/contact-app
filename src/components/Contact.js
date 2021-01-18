
import React, { useContext } from "react";
import { Row, Col, Button } from "reactstrap";

// icons
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";

//add firebase
import firebase from "firebase/app";


// context stuffs
// import context and action: update and single_contact
import {ContactContext} from "../context/Context";
import {CONTACT_TO_UPDATE, SET_SINGLE_CONTACT} from "../context/action.types";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";


const Contact = ({ contact, contactKey }) => {
  //destructuring dispatch from the context
  const {state, dispatch} = useContext(ContactContext);
  const {user} = state;

  // history hooks to get history
  const history = useHistory();

  // to delete the contact when delete contact is clicked
  const deleteContact = () => {
    //: create this method from firebase
    
    firebase.database().ref(`contacts/${user}/${contactKey}`)
    .remove()
    .then(()=>{
      toast("Contact Deleted", {type: 'error'});
    })
    .catch(err => console.log(err))
  };

  // update the star/important contact ,ie, star it or unstar the single contact
  const updateImpContact = () => {
    //: update (star) contact, use contactKey
    firebase.database().ref(`contacts/${user}/${contactKey}/`)
    .update(
      {
        'star' : !contact.star
      }
    ) 
    .then(()=>{
      toast("Contact updated", {type: 'success'});
    })
    .catch(err=> console.log(err))
  };

  // when the update icon/ pen ion is clicked
  const updateContact = () => {
    // dispatching one action to update contact
    dispatch({
      type: CONTACT_TO_UPDATE,
      payload: contact,
      key: contactKey
    });

    // and pushing to the add contact screen
    history.push("/contact/add");
  };

  // to view a single contact in the contact/view screen
  const viewSingleContact = contact => {
    // setting single contact in state
    // use dispatch to view single contact
    dispatch({
      type: SET_SINGLE_CONTACT,
      payload: contact
    })

    // sending...
    history.push("/contact/view");
  };

  return (
    <>
      <Row>
        <Col
          md="1"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="icon" onClick={() => updateImpContact()}>
            {(contact.star) ? (
             <BsFillHeartFill className=" text-danger" />
              
            ) : (
              
              
              <BsHeart className=" text-info" />
            )}
          </div>
        </Col>
        <Col
          md="2"
          className="d-flex justify-content-center align-items-center"
        >
          <img src={contact.picture} alt="" className="img-circle profile" />
        </Col>
        <Col md="7" onClick={() => viewSingleContact(contact)}>
          <div className="text-primary">{contact.name}</div>

          <div className="text-secondary">{contact.phoneNumber}</div>
          <div className="text-secondary">
            {contact.email}
          </div>
 
          <div className="text-info">{contact.address}</div>
        </Col>
        <Col
          md="2"
          className="d-flex justify-content-center align-items-center "
        >
          <Button outline
            color=" primary"
            className = "text-primary"
            onClick={() => updateContact()}
          >Edit </Button>

          <MdDelete
            onClick={() => deleteContact()}
            color="danger"
            className="text-danger icon"
          />
          
        </Col>
      </Row>
    </>
  );
};

export default Contact;
