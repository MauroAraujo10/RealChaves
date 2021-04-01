import React from 'react';
import {Link} from 'react-router-dom';

export default function Teste(){
    return (
        <div className="container">
            <h1>Estatísticas</h1>
            <Link to="Estatisticas/Vendas">Vendas</Link>
            <br />
            <Link to="Estatisticas/Lucros">Lucros</Link>
        </div>
    );
}