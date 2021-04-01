import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Botao from '../../componentes/Botao';
import '../../css/global.css';

import { FaKey, FaUntappd, FaTools, FaChartLine } from 'react-icons/fa';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sizeOfIcon: 28
        };
    }
    render() {
        return (

            <div className="container">
                <h1>Bem Vindo Toninho</h1>

                <div className="botoes">
                    <Botao 
                        icon={<FaKey size={this.state.sizeOfIcon}/>} 
                        url="/Chaves" 
                        text="Chaves" 
                        color="#FFFF00" />

                    <Botao 
                        icon={<FaUntappd size={this.state.sizeOfIcon}/>}
                        url="/Alicates" 
                        text="Alicates"
                        color="#027800" />
                </div>
                <div className="botoes">
                    <Botao 
                        icon={<FaTools size={this.state.sizeOfIcon}/>} 
                        url="/Servicos" 
                        text="Serviços" 
                        color="#004878" />

                    <Botao 
                        icon={<FaChartLine size={this.state.sizeOfIcon}/>} 
                        url="/Estatisticas" 
                        text="Estatísticas" 
                        color="#E32F29" />
                </div>
            </div>
        );
    }
}

export default withRouter(Home);