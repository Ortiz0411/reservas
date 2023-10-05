import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NavBar } from "./NavBar";
import { Footer } from './Footer';
import { Contact } from "./Contact";

const url = "http://localhost:4000/reservation/getResInfo";

export function GetReserva() {
  const [search, setSearch] = useState("");
  const [getResers, setGetReser] = useState([]);

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    try {
      const response = await axios.get(url);
      setGetReser(response.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const searcher = async (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  };

  let resultado = [];
  if(!search){
      resultado = getResers;
  }else {
    resultado = getResers.filter((dato) => 
    dato.ClientName.toLowerCase().includes(search.toLowerCase()));
    
  }



 

  return (
    <div className="getReserva">
      <NavBar />
      <section className="e" id="e">
        
        <input className="custom"  value={search} placeholder='Buscar...' 
        onChange={searcher} type="text" name="value" id="value" />

        <table class="table table-dark table-hover">
          <thead>
            <tr>
              <th>Nombre Cliente</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Cantidad</th>
              <th>servicio</th>
              <th>Estado</th>
              <th>Precio</th>
              <th>Impuestos</th>
            </tr>
          </thead>
          <tbody>
            {resultado.map((getReser) => {
              return (
                <tr>
                  <td>{getReser.ClientName}</td>
                  <td>{getReser.ClientLastName}</td>
                  <td>{getReser.ClientEmail}</td>
                  <td>{getReser.ClientTel}</td>
                  <td>{getReser.ReservationDate}</td>
                  <td>{getReser.ServiceDetailTime}</td>
                  <td>{getReser.ServiceDetailPax}</td>
                  <td>{getReser.ServiceDetailId}</td>
                  <td>{getReser.ReservationStatus}</td>
                  <td>{getReser.ServiceDetailPrice}</td>
                  <td>{getReser.ServiceDetailTax}</td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <Contact />
      <Footer />
    </div>
  );
}