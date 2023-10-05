import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Home } from './components/Home';
import { GetReserva } from './components/GetReserva';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get" element={<GetReserva />} /> 
      </Routes>
    </Router>
  );
}

export default App;