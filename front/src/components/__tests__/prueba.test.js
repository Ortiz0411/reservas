import { render, screen, fireEvent} from '@testing-library/react'
import Prueba from '../prueba';

describe("<Prueba/>", () => {

    //npm install --save-dev jest
    //npm install --save-dev @testing-library/react react-test-renderer
    //npm test

    //define la prueba
    test("Comprueba que el test sirva", () => { 

        //arrange, se inicializan las variable necesarias para el test
        const a = 2;
        const b = 3;

        //act, se ejecuta la funcion que queremos probar
        const total = a+b;
        
        //asseert, se compara el resultado esperado
        expect(total).toBe(5);
    });
     
    
    test("Elementos se encuentran en el componente", () => { 
        render(<Prueba/>);

        //arrange, se inicializan las variable necesarias para el test
        //Busca y selecciona los elementos de acuerdo al texto
        const pruebaEle = screen.getByText(/Veces: /i);    //la ultima i es para no diferenciar entre mayus y minis
        const buttonEle = screen.getByText(/Contar/i);
    

        //Verifica que los elementos se encuentran
        expect(pruebaEle).toBeInTheDocument();
        expect(buttonEle).toBeInTheDocument();
    });
    

    
    
    test("Funciona el boton", () => {
        render(<Prueba/>)

        //selecciona el boton
        const buttonEle = screen.getByText(/Contar/i);

        //simula que el usuario a dado click
        fireEvent.click(buttonEle);


        const pruebaEle = screen.getByText(/Veces: 1/i);
        expect(pruebaEle).toBeInTheDocument();
    })
    
    
    
    test("Comprobar el valor del campo de texto", () => {
        render(<Prueba />);
    
        // Selecciona el campo de texto y el botón
        const inputElement = screen.getByRole("textbox");

        // Simula la entrada de texto en el campo
        fireEvent.change(inputElement, { target: { value: "Hola" } });
    
        // Verifica el valor del campo de texto
        expect(inputElement.value).toBe("Hola");
      }); 
    

});