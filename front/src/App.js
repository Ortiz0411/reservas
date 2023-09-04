import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';



const url="http://localhost:4000/service/";

class App extends Component{
  
  state={
    data:[],
    modalInsertar: false, 
    modalEliminar: false,
    form:{
      id:'',
      name:'',
      category:'',
      description:'',
      rackPrice:'',
      netPrice:'',
      tax:'',
      tipoModal:''
      
    }
     
  }


  get=()=>{
    axios.get(url+ "getServices").then(response=>{
      this.setState({data: response.data});
    }).catch(error=>{
      console.log(error.message);
    })
  }


  peticionPost=async()=>{
    
   await axios.post(url + "addService",this.state.form).then(response=>{
      this.modalInsertar();
      this.get();
    }).catch(error=>{
      console.log(error.message);
    })
  }


  peticionPut=()=>{
    axios.put(url+"updateService"+this.state.form.id, this.state.form).then(response=>{
      this.modalInsertar();
      this.get();
    }).catch(error=>{
      console.log(error.message);
    })
  }


  peticionDelete=()=>{
    axios.delete(url+"deleteService/"+this.state.form.id).then(response=>{
     this.setState({modalEliminar: false});
      this.get();
    }).catch(error=>{
      console.log(error.message);
    })
    console.log(this.state.form.id);
  }


  selectService = (service) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: service.id,
        name: service.name,
        category: service.category,
        description: service.description,
        rackPrice: service.rackPrice,
        netPrice: service.netPrice,
        tax: service.tax,
      },
    });
  };


  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }


  componentDidMount(){
    this.get();
  }
 

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value 
      }
    });
    console.log(this.state.form);
  }


  render(){
    const {form}=this.state;
    return(
     <div className="app">
      <br/>
      <div className="center-content"> 
        <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar servicio</button>
      </div>
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
             {this.state.data.map(service=>{
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
              <button className="btn btn-primary" onClick={()=>{this.selectService(service); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.selectService(service); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
              </tr>
              )  
             })}
          </tbody>
        </table>



        <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">Id del servicio</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="name">Nombre del servicio</label>
                    <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form?form.name : ''}/>
                    <br />
                    <label htmlFor="category">Categoria</label>
                    <input className="form-control" type="text" name="category" id="category" onChange={this.handleChange} value={form ?form.category : ''}/>
                    <br />
                    <label htmlFor="description">Descripción</label>
                    <input className="form-control" type="text" name="description" id="description" onChange={this.handleChange} value={form ? form.description : ''}/>
                    <br />
                    <label htmlFor="rackPrice">Tarifa rack</label>
                    <input className="form-control" type="text" name="rackPrice" id="rackPrice" onChange={this.handleChange} value={form ? form.rackPrice : ''}/>

                    <br />
                    <label htmlFor="netPrice">Precio neto</label>
                    <input className="form-control" type="text" name="netPrice" id="netPrice" onChange={this.handleChange} value={form ? form.netPrice : ''}/>
                    <br />
                    <label htmlFor="tax">Impuestos</label>
                    <input className="form-control" type="text" name="tax" id="tax" onChange={this.handleChange} value={form ? form.tax : ''}/>
                  </div>
                </ModalBody>

                <ModalFooter>
                {this.state.tipoModal==='insertar'?
                
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPost()}>
                    Actualizar
                  </button>
            }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar el servicio {form && form.name}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>
            Sí
            </button>
            <button className="btn btn-secondary" onClick={() => this.setState({ modalEliminar: false })}>
            No
             </button>
            </ModalFooter>
        </Modal>


     </div>
    );
  }
 
}

export default App;