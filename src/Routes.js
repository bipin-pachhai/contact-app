// react-router-dom3
import React , { useReducer} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import reducer from "./context/reducer";
import {ContactContext} from "./context/Context";

import App from "./App";
import AddContact from "./pages/AddContact";
import Contacts from "./pages/Contacts";
import PageNotFound from "./pages/PageNotFound";
import ViewContact from "./pages/ViewContact";




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