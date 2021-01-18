import React from "react";

import "./App.css";

// components
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./pages/Home";


const App = () => {
 
  return (
    <div>      
    <Header/>
    <Home/>
    <Footer/>            
   </div>
    );
};

export default App;
