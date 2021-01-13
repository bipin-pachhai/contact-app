
import React, { useContext } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
import { ContactContext } from "../context/Context";


const Header = () => {
  const {state} = useContext(ContactContext);
  const {user, userPhoto} = state;
  return (
    <div>
      <Navbar color="info" light >
      <NavbarBrand tag ={Link } to = "/" className="text-white "> Contact Application</NavbarBrand>
      
      {(user) ?( <img src= {userPhoto} className = "rounded-circle float-right " alt="" width = "50" height ="50" ></img> 
      ): (<h3 className="text-white float-right">Welcome</h3>)}
      
      
    </Navbar>
    </div>
  );
};

export default Header;