import React from 'react';
import { Link } from 'react-router-dom';
import { FaKey } from "react-icons/fa";
import { Rotas } from '../Routes/rotas'
import './style.css'

export default function Header() {
    return (
        <header>
            <Link to={Rotas.Home}>
                <FaKey
                    className="mr-2"
                    size={20} />
                Real Chaves
                </Link>
        </header>
    );
}