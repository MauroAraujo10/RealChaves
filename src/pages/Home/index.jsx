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

//     render() {
//         return (
//             <>
//                 <div style={{ textAlign: 'center', marginTop: '20px' }}>
//                     <h1>Inicio</h1>
//                 </div>
//                 <Row gutter={10} style={{ padding: '10px' }}>
//                     <Col span={8}>
//                         <Card
//                             style={{
//                                 width: 300,
//                                 borderBottom: '5px solid #03bb85',
//                                 boxShadow: '5px 2px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'
//                             }}>
//                             <div style={{ width: '100%' }}>
//                                 <FcCurrencyExchange size={40} style={{ float: 'left' }} />
//                                 <span style={{ float: 'right', fontSize: '30px' }}>{this.state.chaves}</span>
//                             </div>
//                         </Card>
//                     </Col>
//                     <Col span={8}>
//                         <Card
//                             style={{
//                                 width: 300,
//                                 borderBottom: '5px solid #03bb85',
//                                 boxShadow: '5px 2px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'
//                             }}
//                             bordered >
//                             <div style={{ width: '100%' }}>
//                                 <FcKindle size={40} style={{ float: 'left' }} />
//                                 <span style={{ float: 'right', fontSize: '30px' }}>2.565</span>
//                             </div>
//                         </Card>
//                     </Col>
//                     <Col span={8}>
//                         <Card style={{
//                             width: 300,
//                             borderBottom: '5px solid #03bb85',
//                             boxShadow: '5px 2px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'
//                         }}
//                             bordered >
//                             <div style={{ width: '100%' }}>
//                                 <FcManager size={40} style={{ float: 'left' }} />
//                                 <span style={{ float: 'right', fontSize: '30px' }}>1.576</span>
//                             </div>
//                         </Card>
//                     </Col>
//                 </Row>
//                 <Row style={{
//                     background: '#FFF',
//                     borderRadius: '5px',
//                     padding: '5px',
//                     margin: '10px',
//                     boxShadow: '5px 2px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'
//                 }}>
//                     <div style={{ textAlign: 'center' }}>
//                         <h4 >
//                             Informações a serem apresentadas ao usuários
//                     </h4>
//                     </div>

//                 </Row>
//             </>
//         );
//     }
// }

// export default withRouter(Home);