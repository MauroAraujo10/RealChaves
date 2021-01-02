import React from 'react';
import Form from '../components/alicates.form';
import {Link} from 'react-router-dom';

export default function Alicates() {
    return (
        <div>
            <Form
                title={'Passou a 29 em'}
            />
            <Link to="/Alicates">
                Voltar
            </Link>
        </div>
    );
}