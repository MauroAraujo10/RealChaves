import React, { Component, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, DatePicker, Breadcrumb, Button } from 'antd';
import { Row, Col } from 'antd'
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Rotas } from '../../../Routes/rotas';
import service from '../../../service';
import tabelas from '../../../common/Messages/tabelas';
import { AiOutlineHome, AiOutlineFileSearch, AiOutlineDribbble, AiOutlineEnvironment } from "react-icons/ai";

const EstatisticaChave = () => {
    const [chaves, setChaves] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        service.app.ref(tabelas.Chave).on('value', (snapshot) => {

            let chaves = [];
            let data = [];

            snapshot.forEach((x) => {
                data.push({name: x.val().Data, valor: x.val().NumeroSerie})
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
            setChaves(chaves);
            setChartData(data);
        });
    }, []);

    return (
        <>
            <Row>
                <Col span={6} className="container">
                    <b>Teste de Valor</b>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                        <AiOutlineFileSearch size={48} className="mr-2" style={{ color: '#00F' }} />
                        Teste de valor <br />
                        {chaves[0]?.Tipo}
                    </div>
                </Col>
                <Col span={6} className="container">
                    <b>Teste</b>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                        <AiOutlineDribbble size={48} className="mr-2" style={{ color: '#F0F' }} />
                        Teste de unidade <br />
                        233
                    </div>
                </Col>
                <Col span={6} className="container" style={{ marginBottom: '1px solid #FF0' }}>
                    <b>Teste de Enviroment</b>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                        <AiOutlineEnvironment size={48} className="mr-2" style={{ color: '#abcFFF' }} />
                        Teste de Enviroment <br />
                        6668
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={20}>
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

// class EstatisticaChave extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             DataInicio: undefined,
//             DataFim: undefined,
//             chartDataOriginal: [],
//             chartData: []
//         };
//     }

//     componentDidMount() {
//         service.app.ref(tabelas.Vendas).on('value', (snapshot) => {
//             let data = [];
//             let dataOriginal = [];

//             snapshot.forEach((x) => {
//                 data.push(
//                     { name: x.val().Data, valor: x.val().Valor }
//                 )
//                 dataOriginal.push({

//                 })
//             })

//             this.setState({
//                 chartData: data,
//                 DataFim: Date.parse(data[0].Data), //ALTERAR INDICE
//                 DataInicio: data[data.length - 1].Data //ALTERAR INDICE
//             });
//         });
//     }

//     render() {
//         return (
//             <>
//                 <div>
//                     <div className="t-center mb-2 mt-2">
//                         <h1> Estatísticas Chave</h1>
//                         <Breadcrumb>
//                             <Breadcrumb.Item>
//                                 <Link to={Rotas.Home}>
//                                     <AiOutlineHome className="mr-1" />
//                                     Início
//                                 </Link>
//                             </Breadcrumb.Item>
//                             <Breadcrumb.Item>
//                                 Estatísticas Chave
//                             </Breadcrumb.Item>
//                         </Breadcrumb>
//                     </div>
//                 </div>

//                 <Form className="mt-2" onFinish={() => { }} style={{ margin: '10px' }}>

//                     <Row>
//                         <div className="mr-3">
//                             <Form.Item
//                                 label="Data Início"
//                                 name="DataInicio"
//                             >
//                                 <DatePicker
//                                     className="mr-1"
//                                     format="DD/MM/YYYY"
//                                     onChange={(date, dateString) => this.setState({ DataInicio: date })}
//                                     value={this.state.DataInicio}
//                                 />
//                             </Form.Item>
//                         </div>

//                         <div className="mr-3">
//                             <Form.Item
//                                 label="Data Fim"
//                                 name="DataFim"
//                             >
//                                 <DatePicker
//                                     format="DD/MM/YYYY"
//                                     onChange={(date, dateString) => this.setState({ DataFim: dateString })}
//                                     value={this.state.DataFim}
//                                 />
//                             </Form.Item>
//                         </div>

//                         <Col span={3}>
//                             <Button type="success">
//                                 <AiOutlineFileSearch className="mr-1" size={16} />
//                                 Pesquisar
//                             </Button>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col span={20}>
//                             <ResponsiveContainer width="100%" height={500} className="container" style={{ margin: '20px' }}>
//                                 <BarChart data={this.state.chartData}>
//                                     <CartesianGrid strokeDasharray="3 3" />
//                                     <XAxis dataKey="name" />
//                                     <YAxis />
//                                     <Tooltip />
//                                     <Legend />
//                                     <Bar dataKey="valor" fill="#004878" />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </Col>
//                     </Row>
//                 </Form>
//             </>
//         );
//     }
// }

// export default withRouter(EstatisticaChave);