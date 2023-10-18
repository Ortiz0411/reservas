import React, { useState } from "react";

const Prueba = () => {
    
    const [veces, setVeces] = useState(0);
    const [texto, setTexto] = useState("");

    const contar = () => {
        setVeces(veces + 1);
    }

    return (
        <div>
            <p>Veces: {veces}</p>
            <input
                type="text"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />
            <button onClick={contar}>Contar</button>
        </div>

    );
};

export default Prueba;