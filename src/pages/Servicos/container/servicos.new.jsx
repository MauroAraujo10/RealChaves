import React from 'react';
import { Link } from 'react-router-dom';
import ServicoForm from '../components/servicos.form';


export default function Teste() {
    return (
        <div>
            <ServicoForm prefix={'I'}/>
            <Link to="/Servicos">Voltar</Link>
        </div>
    );
}