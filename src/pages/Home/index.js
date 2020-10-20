import React from 'react';
import Botao from '../../componentes/Botao';
import './style.css'

export default function Home() {
    return (

        <div className="container">
            <h1>Bem Vindo Toninho</h1>

            <div className="botoes">
                <Botao url="/Chaves" text="Chaves" color="#FFFF00" />
                <Botao url="/Alicates" text="Alicates" color="#027800" />
            </div>
            <div className="botoes">
                <Botao url="/Servicos" text="Serviços" color="#004878" />
                <Botao url="/Estatisticas" text="Estatísticas" color="#E32F29" />
            </div>
        </div>
    );
}