import React from 'react';
import { Link } from 'react-router-dom';
import { FaKey } from "react-icons/fa";
import './style.css'

export default function Header() {
    return (
        <header>
            <Link to="/">   
                <FaKey
                    style={{ marginRight: "10px" }}
                    size={20}
                    color="FF0" />
                Real Chaves
                </Link>
        </header>
    );
}