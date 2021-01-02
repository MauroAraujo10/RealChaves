import React from 'react';
import { Link } from 'react-router-dom';

export default function Form({title, prefix}) {

    function submitForm(e){
        switch(prefix){
            case 'I':
                alert('Include');
                break;
                case 'E':
                    alert('Edit');
                break;
                case 'V':
                    alert('View');
                break;
                default: 
                break;
        }
    }

    return (
        <div className="container">
            <h2>{title}</h2>
            <Link to="/Chaves">
                voltar
            </Link>
        </div>
    );
}