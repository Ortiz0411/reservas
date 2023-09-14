import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://localhost:4000/service/";



function App() {
  const [services, setServices] = useState([]);
  const [search, setSearch ] = useState("");
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [form, setForm] = useState({
    id: '',
    name: '',
    category: '',
    description: '',
    rackPrice: '',
    netPrice: '',
    tax: '',
    tipoModal: ''
  });

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    try {
      const response = await axios.get(url + "getServices");
      setServices(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const peticionPost = async () => {
    try {
      await axios.post(url + "addService", form);
      toggleModalInsertar(); 
      get();
    } catch (error) {
      console.log(error.message);
    }
  };

  const peticionPut = () => {
    axios
      .put(url + "updateService/" + form.id, form)
      .then(() => {
        toggleModalInsertar(); 
        get();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const peticionDelete = () => {
    axios.delete(url + "deleteService/" + form.id)
      .then(() => {
        setModalEliminar(false);
        get();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const selectService = (service) => {
    setForm({
      id: service.id,
      name: service.name,
      category: service.category,
      description: service.description,
      rackPrice: service.rackPrice,
      netPrice: service.netPrice,
      tax: service.tax,
      tipoModal: 'actualizar'
    });
  };
  
  const toggleModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  let resultado = [];
  if(!search){
      resultado = services;
  }else {
    resultado = services.filter((dato)=>
    dato.name.toLowerCase().includes(search.toLocaleLowerCase())
    
    )
  }

  const searcher = async (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  };

  const handleChange = async (e) => {
    e.persist();
    await setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  

  return (
    <div className="app">
      <br />
      <div className="center-content">
      <button className="btn btn-success" onClick={() => { setForm(null); setForm({ tipoModal: 'insertar' }); setModalInsertar(true); }}>Agregar servicio</button>
      </div>
      <input value={search} placeholder='Buscar...' onChange={searcher} type="text" name="value" id="value"/>
      <br /><br />
      <table className="table">
          <thead>
            <tr>
            <th>Id del servicio</th>
              <th>Nombre del servicio</th>
              <th>Categoria</th>
              <th>Descripción</th>
              <th>Tarifa rack</th>
              <th>Precio neto</th>
              <th>Impuestos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
             {resultado.map(service=>{
              return(
                 <tr> 
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.category}</td>
              <td>{service.description}</td>
              <td>{new Intl.NumberFormat("en-EN").format(service.rackPrice)}</td>
              <td>{new Intl.NumberFormat("en-EN").format(service.netPrice)}</td>
              <td>{new Intl.NumberFormat("en-EN").format(service.tax)}</td>
              <td>
              <button className="btn btn-primary" onClick={() => { selectService(service); toggleModalInsertar(); }}> <FontAwesomeIcon icon={faEdit} /></button>
              {"   "}
              <button className="btn btn-danger" onClick={() => { selectService(service); setModalEliminar(true); }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </td>
              </tr>
              )  
             })}
          </tbody>
        </table>


        <Modal isOpen={modalInsertar}>
            <ModalHeader style={{ display: 'block' }}>
              <span style={{ float: 'right' }} onClick={() => toggleModalInsertar()}>x</span>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label htmlFor="name">Nombre del servicio</label>
                    <input className="form-control" type="text" name="name" id="name" onChange={handleChange} value={form ? form.name : ''} />
                    <br />
                    <label htmlFor="category">Categoria</label>
                    <input className="form-control" type="text" name="category" id="category" onChange={handleChange} value={form ?form.category : ''}/>
                    <br />
                    <label htmlFor="description">Descripción</label>
                    <input className="form-control" type="text" name="description" id="description" onChange={handleChange} value={form ? form.description : ''}/>
                    <br />
                    <label htmlFor="rackPrice">Tarifa rack</label>
                    <input className="form-control" type="text" name="rackPrice" id="rackPrice" onChange={handleChange} value={form ? form.rackPrice : ''}/>

                    <br />
                    <label htmlFor="netPrice">Precio neto</label>
                    <input className="form-control" type="text" name="netPrice" id="netPrice" onChange={handleChange} value={form ? form.netPrice : ''}/>
                    <br />
                    <label htmlFor="tax">Impuestos</label>
                    <input className="form-control" type="text" name="tax" id="tax" onChange={handleChange} value={form ? form.tax : ''}/>
              </div>
            </ModalBody>

            <ModalFooter>
              {form.tipoModal === 'insertar' ?
                <button className="btn btn-success" onClick={() => peticionPost()}>
                  Insertar
                </button> :
                <button className="btn btn-primary" onClick={() => peticionPut()}>
                  Actualizar
                </button>
              }
              <button className="btn btn-danger" onClick={() => setModalInsertar(false)}>Cancelar</button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={modalEliminar}>
            <ModalBody>
              Estás seguro que deseas eliminar el servicio {form && form.name}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={() => peticionDelete()}>
                Sí
              </button>
              <button className="btn btn-secondary" onClick={() => setModalEliminar(false)}>
                No
              </button>
            </ModalFooter>
        </Modal>


    </div>
  );
}

export default App;