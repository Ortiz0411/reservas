import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Home } from './components/Home';
import { Service } from './components/Service';
import {Reserva} from  './components/Reserva';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Reserva" element={<Service />} />
      </Routes>
    </Router>
  );
}

export default App;