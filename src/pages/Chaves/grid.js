import React from 'react';
import { Link } from 'react-router-dom';

export default function Grid() {
    return (
        <div>
            <h1>Grid Chaves</h1>

            <Link to="/">
                Voltar
            </Link>

            <Link to="/Chaves/new">
                New Chave
            </Link>

        </div>
    );
}