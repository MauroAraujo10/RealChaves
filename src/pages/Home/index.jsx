import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Card } from 'antd';

import service from '../../service';
import { FcCurrencyExchange, FcKindle, FcManager } from "react-icons/fc";

class Home extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        service.app.ref('Chave').on('value', (snapshot) => {
            let chaves = [];
            snapshot.forEach((x) => {
                chaves.push({
                    Id: x.key,
                    key: x.key,
                    Marca: x.val().Marca,
                    NumeroSerie: x.val().NumeroSerie,
                    Quantidade: x.val().Quantidade,
                    Tipo: x.val().Tipo,
                    Data: x.val().Data
                })
            })
            this.setState({ chaves: chaves });
        });
    }


    render() {
        return (
            <>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h1>Inicio</h1>
                </div>
                <Row gutter={10} style={{ padding: '10px' }}>
                    <Col span={8}>
                        <Card
                            style={{
                                width: 300,
                                borderBottom: '5px solid #03bb85',
                                boxShadow: '5px 2px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'
                            }}>
                            <div style={{ width: '100%' }}>
                                <FcCurrencyExchange size={40} style={{ float: 'left' }} />
                                <span style={{ float: 'right', fontSize: '30px' }}>5.165</span>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{
                                width: 300,
                                borderBottom: '5px solid #03bb85',
                                boxShadow: '5px 2px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'
                            }}
                            bordered >
                            <div style={{ width: '100%' }}>
                                <FcKindle size={40} style={{ float: 'left' }} />
                                <span style={{ float: 'right', fontSize: '30px' }}>2.565</span>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{
                            width: 300,
                            borderBottom: '5px solid #03bb85',
                            boxShadow: '5px 2px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'
                        }}
                            bordered >
                            <div style={{ width: '100%' }}>
                                <FcManager size={40} style={{ float: 'left' }} />
                                <span style={{ float: 'right', fontSize: '30px' }}>1.576</span>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row style={{
                    background: '#FFF',
                    borderRadius: '5px',
                    padding: '5px',
                    margin: '10px',
                    boxShadow: '5px 2px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <h4 >
                            Informações a serem apresentadas ao usuários
                    </h4>
                    </div>

                </Row>
            </>
        );
    }
}

export default withRouter(Home);