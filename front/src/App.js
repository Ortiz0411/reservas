import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const url="http://localhost:4000/service/";

class App extends Component{
  
  state={
    data:[]
  }

  get=()=>{
    axios.get(url+ "getServices").then(response=>{
      this.setState({data: response.data});
    })
  }

  
  componentDidMount(){
    this.get();
  }


  render(){
    return(
     <div className="app">
      <br/>
      <button className="btn btn-success">Agregar servicio</button>
      <br /><br />
        <table className="table">
          <thead>
            <tr>
              <th>Nombre del servicio</th>
              <th>Categoria</th>
              <th>Descripción</th>
              <th>Precio estandar</th>
              <th>Precio neto</th>
              <th>Impuestos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
             {this.state.data.map(service=>{
              return(
                 <tr> 
              <td>{service.name}</td>
              <td>{service.category}</td>
              <td>{service.description}</td>
              <td>{service.rackPrice}</td>
              <td>{service.netPrice}</td>
              <td>{service.tax}</td>
              <td>
                <button className="btn btn-primary" ><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
              </tr>
              )  
             })}
          </tbody>
        </table>
     </div>
    );
  }
 
}

export default App;