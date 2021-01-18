import React, { useContext } from "react";
import firebase from "firebase/app";

import { Navbar, NavbarBrand,UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
 } from "reactstrap";

 import { ToastContainer,toast } from "react-toastify";
import { Link, useHistory} from "react-router-dom";
import { ContactContext } from "../context/Context";
import { REMOVE_USER} from "../context/action.types";




const Header = () => {
  const {state, dispatch} = useContext(ContactContext);
  const {user, userPhoto} = state;
  const history = useHistory();

  //On signout event
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
  };
  return (
    <div>
      <Navbar color="info" light >
      <NavbarBrand tag ={Link } to = "/" className="text-white  ml-4 "> Contact Book</NavbarBrand>
      
      {(user) ?(< span className = "float-right"> <img src= {userPhoto} className = "rounded-circle" alt="" width = "50" height ="50" ></img> 
      <UncontrolledDropdown className = "float-right">
              <DropdownToggle outline nav caret className ="text-dark " >       
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick = {handleSubmit}>
                  Signout
                </DropdownItem>    
              </DropdownMenu>
      </UncontrolledDropdown>
            </ span>
      ): (<></>)}    
    </Navbar>
    </div>
  );
};

export default Header;