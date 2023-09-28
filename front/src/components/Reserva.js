import axios from "axios";
import React, { useState, useEffect } from 'react';
import { NavBar } from "./NavBar";

const url = "http://localhost:4000/client/addClient";

export function Reserva() {
    const [form, setFormClient] = useState({
      name: '',
      lastName: '',
      email: '',
      tel: '',
    });


    const peticionPostClient = async () => {
        try {
          await axios.post(url, form);
        } catch (error) {
          console.log(error.message);
        }
      }
     
      

    

      return(
       <div>
         
         <div className="form-group">
            <h2>Agregar Cliente</h2>
            <input type="text"  name="name"  value={form ? form.name : ''}/>
            <input type="text" name="lastName" placeholder="Apellido" value={form ? form.lastName : ''}/>
            <input type="email" name="email" placeholder="Correo" value={form ? form.email : ''}/>
            <input type="text" name="tel" placeholder="Telefono" value={form ? form.tel : ''}/>

            <button className="vvd" onClick={() => peticionPostClient()} ><span>Reservar</span></button>
        </div>
       </div>
       

      );




}
export default Reserva;