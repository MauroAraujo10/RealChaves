import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import tabelas from '../../common/Messages/tabelas';

import service from '../../service';
import { FcFaq, FcKindle, FcSupport } from "react-icons/fc";

const Home = () => {
    const [chavesVendidasHoje, setChavesVendidasHoje] = useState(0);
    const [alicatesAmoladoHoje, setAlicatesAmoladoHoje] = useState(0);
    const [servicosRealizadosHoje, setServicosRealizadosHoje] = useState(0);
    const dataAtual = moment().format('DD/MM/yyyy');

    useEffect(() => {

        function getChaves() {
            service.app.ref(tabelas.CopiasChave).once('value', (snapshot) => {
                let numeroChavesVendidasHoje = 0;
                snapshot.forEach((x) => {
                    if (x.val().Data === dataAtual)
                        numeroChavesVendidasHoje = numeroChavesVendidasHoje + x.val().Quantidade;
                })
                setChavesVendidasHoje(numeroChavesVendidasHoje);
            })
        }

        function getAlicates() {
            service.app.ref(tabelas.Amolacao).once('value', (snapshot) => {
                let numeroAlicatesAmoladosHoje = 0;
                snapshot.forEach((x) => {
                    if (x.val().Data === dataAtual)
                        numeroAlicatesAmoladosHoje++;
                })
                setAlicatesAmoladoHoje(numeroAlicatesAmoladosHoje);
            })
        }

        function getServicos() {
            service.app.ref(tabelas.Servicos).once('value', (snapshot) => {
                let numeroServicosRealizadosHoje = 0;
                snapshot.forEach((x) => {
                    if (x.val().Data === dataAtual)
                        numeroServicosRealizadosHoje++;
                })
                setServicosRealizadosHoje(numeroServicosRealizadosHoje);
            })
        }

        getChaves();
        getAlicates();
        getServicos();

    }, [dataAtual]);

    return (
        <>
            <Row style={{ display: "flex", justifyContent: 'space-around' }} className="mt-2">
                <Col md={6} xs={20} className="container t-center">
                    <div>
                        <FcFaq size={40} />
                    </div>
                    <h1>Venda de Chaves: {chavesVendidasHoje}</h1>
                    <h4 style={{ color: 'gray' }}>Número de chaves que foram vendidas hoje</h4>
                </Col>

                <Col md={6} xs={20} className="container t-center">
                    <FcKindle size={40} />
                    <h1>Alicates amolados: {alicatesAmoladoHoje}</h1>
                    <h4 style={{ color: 'gray' }}>Número de Alicates que foram amolados hoje</h4>
                </Col>

                <Col md={6} xs={20} className="container t-center">
                    <FcSupport size={40} />
                    <h1>Serviços Realizados: {servicosRealizadosHoje}</h1>
                    <h4 style={{ color: 'gray' }}>Número de serviços que foram reaizados hoje</h4>
                </Col>
            </Row>
        </>
    );
}

export default Home;