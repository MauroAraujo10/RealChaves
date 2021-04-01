import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ServicoForm from '../components/servicos.form';

function ServicoEdit() {
    return (
        <div>
            <ServicoForm prefix={'E'}/>
            <Link to="/Servicos">Voltar</Link>
        </div>
    );
}

export default withRouter(ServicoEdit);