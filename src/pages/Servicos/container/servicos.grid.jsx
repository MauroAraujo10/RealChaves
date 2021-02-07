import React from 'react';
import { Link } from 'react-router-dom';

export default function servicosGrid(){
    return (
        <div>
            <h1>Grid</h1>
            <Link to="/servicos/new">Cadastrar Serviço</Link> 
            <br />
            <Link to="/">Voltar</Link>
        </div>  
    );
}