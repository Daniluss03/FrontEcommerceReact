import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Login/Login';

import Crud from './crud/crud';
import CrudProducts from './crudProducts/crudProducts';
import Navbar from './Navbar/Navbar';
import Home from './pages/Homee/Home';
import CardsTienda from './cardsTienda/cardsTienda'

const App = () => {
  return (
    <Router>
   <Navbar/>
      <Routes>
        <Route exact path="/login"  element={   <Login/>} />
        <Route exact path="/crud" element={<Crud/>} />
        <Route exact path="/CrudProductos" element={<CrudProducts/>} />
        <Route exact path="/Home" element={<Home/>} />
        <Route exact path="/Cards" element={<CardsTienda/>} />
      </Routes>
    </Router>
  );
};

export default App;
