import React from 'react';
import { Link } from "react-router-dom";

export default function Erro(){
    return(
        <div className="container">
            <h1>Página não encontrada</h1>
            <Link to="/">Inicio</Link>
        </div>
    );
}