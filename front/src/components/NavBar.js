import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logo from '../assets/img/logo.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import {  Row, Col } from "react-bootstrap";

const url = "http://localhost:4000/";
const url2= "http://localhost:4000/reservation/addResClient";
 


export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [modalInsertarClient, setModalInsertarClient] = useState(false);
  const [service, setService] = useState([]);
  const [ setSearch ] = useState("");
  const [form1, setFormClient] = useState({
    name: '',
    lastname: '',
    email: '',
    tel: '',
  });
  const [form2, setFormRes] = useState({
    date: Date,
  });

  const [form3, setFormServ] = useState({
    time: '',
    pax: '',
    id: '',
  });
  

  useEffect(() => {
    axios.get("http://localhost:4000/service/getServices")
      .then((response) => {
        console.log(response);
        setService(response.data); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  const peticionPostClient = async () => {
    try {
      await axios.post(url + "client/addClient", form1);
      toggleModalInsertarClient(); 
    } catch (error) {
      console.log(error.message);
    }
  };

  const peticionPostRes = async () => {
    try {
      await axios.post(url2, form2);
    } catch (error) {
      console.log(error.message);
    }
  };

  const peticionPostSer = async () => {
    try {
      await axios.post(url+"serviceDet/addSerDet", form3);
    } catch (error) {
      console.log(error.message);
    }
  };


  const selectService = (client) => {
    setFormClient({
      
      name: client.name,
      lastName: client.lastName,
      gmail: client.gmail,
      tel: client.tel,
    });
  };

  const handleChange = async (e) => {
    e.persist();
    await setFormClient({
      ...form1,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = async (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  };
    
  
  const handleChangeRes = async (e) => {
    e.persist();
    await setFormRes({
      ...form2,
      [e.target.name]: e.target.value
    });
  };


  const handleChangeSer = async (e) => {
    e.persist();
    await setFormServ({
      ...form3,
      [e.target.name]: e.target.value
    });
  };

  


  const toggleModalInsertarClient = () => {
    setModalInsertarClient(!modalInsertarClient);
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <div>
         <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="#restaurants" className={activeLink === 'restaurants' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('restaurants')}>Restaurante</Nav.Link>
              <Nav.Link href="#tours" className={activeLink === 'tours' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('tours')}>Tour</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="#"><img src={navIcon1} alt="" /></a>
                <a href="#"><img src={navIcon2} alt="" /></a>
                <a href="#"><img src={navIcon3} alt="" /></a>
              </div>

              <button className="vvd" onClick={() => {  toggleModalInsertarClient(); }}><span>Reservar</span></button>

            </span>
            

          </Navbar.Collapse>
          
        </Container>
      </Navbar>

      <Modal isOpen={modalInsertarClient} className="modal-insertar-client">
            <ModalHeader style={{ display: 'block' }}>
              <span style={{ float: 'right' }} onClick={() => toggleModalInsertarClient()}>x</span>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
              <Row>
                  <h2>Agregar Cliente</h2>
                   <Col size={12} sm={6} className="px-2">
                      <input type="text"  className="custom-input" name="name" placeholder="Nombre" onChange={handleChange}  value={form1 ? form1.name : ''} />
                    </Col>
                    <Col size={12} sm={6} className="px-2">
                      <input type="text" className="custom-input" name="lastname" placeholder="Apellido" onChange={handleChange} value={form1 ? form1.lastname : ''}/>
                    </Col>
                    <Col size={12} sm={6} className="px-2">
                      <input type="email"  className="custom-input" name="email" placeholder="Correo" onChange={handleChange} value={form1 ? form1.email : ''}/>
                    </Col>
                    <Col size={12} sm={6} className="px-2">
                      <input type="text"  className="custom-input" name="tel" placeholder="Telefono" onChange={handleChange} value={form1 ? form1.tel : ''}/>
                    </Col>
                  </Row>
                  <Row>
                  <h2>Reservar</h2>
                   <Col size={12} sm={12} className="px-2">
                      <input type="date"  className="custom-input" name="date" placeholder="Fecha" onChange={handleChangeRes}  value={form2 ? form2.date : ''} />
                    </Col>
                  </Row>
                  <Row>
                  <h2>Servicios</h2>
                  <Col size={12} sm={6} className="px-2">
                      <input type="time"  className="custom-input" name="time" placeholder="Hora" onChange={handleChangeSer} value={form3 ? form3.time : ''}/>
                    </Col>
                    <Col size={12} sm={6} className="px-2">
                      <input type="text"  className="custom-input" name="pax" placeholder="cantidad de personas" onChange={handleChangeSer} value={form3 ? form3.pax : ''}/>
                    </Col>
                  <select name="id" className="form-control" onChange={handleChangeSer}  value={form3 ? form3.id : ''}>
                      {service.map((elemento) => (
                        <option  key={elemento.id} value={elemento.id}>
                          {elemento.name}
                        </option>
                      ))}
                    </select>
                  </Row>
                  
              </div>
            </ModalBody>

            <ModalFooter>
                <button className="btn btn-success" onClick={() => {peticionPostClient();peticionPostRes(); peticionPostSer()}}>Insertar</button>
            </ModalFooter>
          </Modal>

    </div>

  )
}