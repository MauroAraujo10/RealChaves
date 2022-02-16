import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import moment from 'moment';

import service from '../../service';
import { FcFaq, FcKindle, FcSupport } from "react-icons/fc";

const Home = () => {

    const [chavesVendidasHoje, setChavesVendidasHoje] = useState(0);
    const [alicatesAmoladoHoje, setAlicatesAmoladoHoje] = useState(0);
    const [servicosRealizadosHoje, setServicosRealizadosHoje] = useState(0);
    const dataAtual = moment().format('DD/MM/yyyy');

    useEffect(() => {
        getChaves();
        getAlicates();
        getServicos();
    }, []);

    function getChaves() {
        service.app.ref('Vendas').once('value', (snapshot) => {
            let numeroChavesVendidasHoje = 0;
            snapshot.forEach((x) => {
                if (x.val().Data === dataAtual)
                    numeroChavesVendidasHoje++;
            })
            setChavesVendidasHoje(numeroChavesVendidasHoje);
        })
    }

    function getAlicates() {
        service.app.ref('Alicates').once('value', (snapshot) => {
            let numeroAlicatesAmoladosHoje = 0;
            snapshot.forEach((x) => {
                if (x.val().Data === dataAtual)
                    numeroAlicatesAmoladosHoje++;
            })
            setAlicatesAmoladoHoje(numeroAlicatesAmoladosHoje);
        })
    }

    function getServicos() {
        service.app.ref('Servicos').once('value', (snapshot) => {
            let numeroServicosRealizadosHoje = 0;
            snapshot.forEach((x) => {
                if (x.val().Data === dataAtual)
                    numeroServicosRealizadosHoje++;
            })
            setServicosRealizadosHoje(numeroServicosRealizadosHoje);
        })
    }

    return (
        <>
            <Row className="mt-2">

                <Col
                    span={7}
                    className="container homeCard t-center"
                >
                    <div>
                        <FcFaq size={40} className="circle-icon" />
                    </div>
                    <h1>Venda de Chaves: {chavesVendidasHoje}</h1>
                    <h4 style={{ color: 'gray' }}>Número de chaves que foram vendidas hoje</h4>
                </Col>

                <Col
                    span={7}
                    className="container homeCard t-center"
                >
                    <FcKindle size={40} />
                    <h1>Alicates amolados: {alicatesAmoladoHoje}</h1>
                    <h4 style={{ color: 'gray' }}>Número de Alicates que foram amolados hoje</h4>
                </Col>

                <Col
                    span={7}
                    className="container homeCard t-center"
                >
                    <FcSupport size={40} />
                    <h1>Serviços Realizados: {servicosRealizadosHoje}</h1>
                    <h4 style={{ color: 'gray' }}>Número de serviços que foram reaizados hoje</h4>
                </Col>

            </Row>
        </>
    );
}

export default withRouter(Home);