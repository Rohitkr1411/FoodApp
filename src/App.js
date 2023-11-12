import React from 'react'
import './App.css';
import Home from './Screens/Home';
import Login from './Screens/Login';
import {CartProvider} from './components/ContextReducer'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './Screens/Signup';
import MyOrders from './Screens/MyOrders';


function App() {
  return (

    <CartProvider>
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/signup" element={<Signup/>} />
      <Route exact path="/myOrders" element={<MyOrders/>} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
