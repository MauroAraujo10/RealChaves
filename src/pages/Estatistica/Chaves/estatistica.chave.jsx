import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Breadcrumb, Card, Avatar, Button, Divider } from 'antd';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Rotas } from '../../../Routes/rotas';
import service from '../../../service';
import tabelas from '../../../common/Messages/tabelas';
import { AiOutlineHome, AiOutlineSnippets, AiOutlineDownSquare, AiOutlineHdd, AiOutlineEnvironment, AiOutlineDollar, AiOutlineEye } from "react-icons/ai";
import chaveService from '../../Chaves/service/chave.service';

const EstatisticaChave = () => {
    const [listaCopia, setListaCopia] = useState([]);
    const [dtoListaCopia, setDtoListaCopia] = useState({});
    const [listaDescarte, setListaDescarte] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        //setListaCopia(chaveService.teste());
        const a = chaveService.teste().then((dtoListCopia) => {
            setDtoListaCopia(dtoListCopia);
        })
            
        // service.app.ref(tabelas.CopiasChave).once('value', (snapshot) => {
        //     let copias = [];
        //     let copiasHoje = 0;
        //     let copiasEsteMes = 0;
        //     let quantidadeTotal = 0;
        //     let valorTotal = 0;
        //     snapshot.forEach((x) => {
        //         copias.push({
        //             Id: x.val().key,
        //             key: x.val().key,
        //             Quantidade: x.val().Quantidade,
        //             Valor: x.val().Valor,
        //             Data: x.val().Data
        //         })
        //         quantidadeTotal = quantidadeTotal + x.val().Quantidade;
        //         valorTotal = valorTotal + x.val().Valor;
        //     })

        //     const dtoLista = {
        //         CopiasFeitasHoje: copiasHoje,
        //         CopiasFeitaMes: copiasEsteMes,
        //         QuantidadeTotal: quantidadeTotal,
        //         ValorHoje: 55,
        //         ValorMes: 264,
        //         ValorTotal: valorTotal
        //     };

        //     setListaCopia(copias);
        //     setDtoListaCopia(dtoLista);
        // })

        // service.app.ref(tabelas.Descarte).once('value', (snapshot) => {
        //     let descartes = [];
        //     snapshot.forEach((x) => {
        //         descartes.push({
        //             Id: x.val().key,
        //             key: x.val().key,
        //             Data: x.val().Data,
        //             Quantidade: x.val().Quantidade,
        //             Motivo: x.val().Motivo,
        //         })
        //     })
        //     setListaDescarte(descartes);
        // });

    }, []);

    const handle = () => {
        const a = listaCopia.then((XAxis) => {
            console.log(XAxis);
        })
        console.log(listaCopia);
    }

    return (
        <>
            <Button onClick={handle}>
                aaaaaaaaaaaa
            </Button>
            <div className="t-center mb-2">
                <h1>Estatísticas Chaves</h1>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={Rotas.Home}>
                            <AiOutlineHome className="mr-1" />
                            Início
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >Estatísticas</Breadcrumb.Item>
                    <Breadcrumb.Item >Chaves</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Row style={{ margin: '10px' }} gutter={10}>
                <Col md={8} xs={24}>
                    <Card
                        style={{ borderTop: '5px solid #004878' }}
                        className="container"
                        title={'Cópias de Chave'}
                        extra={<AiOutlineEye size={24} />}
                    >
                        <Card.Meta
                            avatar={<Avatar icon={<AiOutlineSnippets className="iconVendaChave" />} style={{ background: '#FFF' }} size={80} />}
                            title={(
                                <>
                                    <h5>Quantidades</h5>
                                    <p>Hoje:<b>{dtoListaCopia?.CopiasFeitasHoje}</b></p>
                                    <p>Este mês: <b>{dtoListaCopia?.CopiasFeitaMes}</b></p>
                                    <p>Quantidade Total: <b>{dtoListaCopia?.QuantidadeTotal}</b></p>
                                    <Divider />
                                    <h5>Arrecadados</h5>
                                    <p>Hoje R$: <b>{dtoListaCopia?.ValorHoje}</b></p>
                                    <p>Este mês R$: <b>{dtoListaCopia?.ValorMes}</b></p>
                                    <p>Total R$: <b>{dtoListaCopia?.ValorTotal}</b></p>
                                </>
                            )}
                        />
                    </Card>
                </Col>
                <Col md={8} xs={24}>
                    <Card style={{ width: 300, borderTop: '5px solid #004878' }} className="container" title={"Descarte de chaves"}>
                        <Card.Meta
                            avatar={<Avatar icon={<AiOutlineDownSquare className="iconDescarte" />} style={{ background: '#FFF' }} size={60} />}
                            title={(
                                <>
                                    <p>Chaves feitas hoje: <b>{dtoListaCopia?.CopiasFeitasHoje}</b></p>
                                    <p>Chaves feitas este mês: <b>{dtoListaCopia?.CopiasFeitaMes}</b></p>
                                    <p>Quantidade Total: <b>{dtoListaCopia?.QuantidadeTotal}</b></p>
                                </>
                            )}
                        />
                    </Card>
                </Col>
                <Col md={8} xs={24}>
                    <Card style={{ width: 300, borderTop: '5px solid #004878' }} className="container" title={"Pedidos de Estoque"}>
                        <Card.Meta
                            avatar={<Avatar icon={<AiOutlineHdd />} />}
                            title={(
                                <>
                                    <p>Chaves feitas hoje: <b>{dtoListaCopia?.CopiasFeitasHoje}</b></p>
                                    <p>Chaves feitas este mês: <b>{dtoListaCopia?.CopiasFeitaMes}</b></p>
                                    <p>Quantidade Total: <b>{dtoListaCopia?.QuantidadeTotal}</b></p>
                                </>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={24} xs={24}>
                    <ResponsiveContainer width="100%" height={500} className="container" style={{ margin: '20px' }}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="valor" fill="#004878" />
                        </BarChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
        </>
    );
}

export default EstatisticaChave;