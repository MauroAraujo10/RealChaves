import React from 'react';
import { Link } from 'react-router-dom';

export default function Alicates() {
    return (
        <div className="container">
            <h1>Alicates</h1>
            <Link to="/" className="mr-3">
                Voltar
            </Link>
            <Link to="/Alicates/new">
                Cadastrar
            </Link>
        </div>
    );
}