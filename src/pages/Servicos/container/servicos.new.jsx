import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ServicoForm from '../components/servicos.form';


function ServicoNew() {
    return (
        <div>
            <ServicoForm prefix={'I'}/>
            <Link to="/Servicos">Voltar</Link>
        </div>
    );
}

export default withRouter(ServicoNew);