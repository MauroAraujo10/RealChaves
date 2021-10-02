import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';

class TotalRegistros extends Component {

    render() {
        const { link, numeroRegistros } = this.props;

        return (
            <>
                <Link to={link} className="btn-Primary">
                    <FaPlusCircle className="mr-3" />
                    Cadastrar
                </Link>
                <h4 className="mt-2">
                    Número total de Registros: {<b>{numeroRegistros}</b>}
                </h4>
            </>
        );
    }
}

export default TotalRegistros;