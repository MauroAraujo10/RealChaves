import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, DatePicker, Breadcrumb, Button } from 'antd';
import { Row, Col } from 'antd'
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Rotas } from '../../../Routes/rotas';
import service from '../../../service';
import { AiOutlineHome, AiOutlineFileSearch } from "react-icons/ai";

class EstatisticaChaves extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DataInicio: undefined,
            DataFim: undefined,
            chartDataOriginal: [],
            chartData: []
        };
    }

    componentDidMount() {
        service.app.ref('Vendas').on('value', (snapshot) => {
            let data = [];
            let dataOriginal = [];

            snapshot.forEach((x) => {
                data.push(
                    { name: x.val().Data, valor: x.val().Valor }
                )
                dataOriginal.push({
                    
                })
            })

            this.setState({
                chartData: data,
                DataFim: Date.parse(data[0].Data), //ALTERAR INDICE
                DataInicio: data[data.length - 1].Data //ALTERAR INDICE
            });
        });
    }

    render() {
        return (
            <>
                <div>
                    <div className="t-center mb-2 mt-2">
                        <h1> Estatísticas Chave</h1>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to={Rotas.Home}>
                                    <AiOutlineHome className="mr-2" />
                                    Início
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                Estatísticas Chave
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>

                <Form className="mt-2" onFinish={() => { }} style={{ margin: '10px' }}>

                    <Row>
                        <div className="mr-3">
                            <Form.Item
                                label="Data Início"
                                name="DataInicio"
                            >
                                <DatePicker
                                    className="mr-2"
                                    format="DD/MM/YYYY"
                                    onChange={(date, dateString) => this.setState({ DataInicio: date })}
                                    value={this.state.DataInicio}
                                />
                            </Form.Item>
                        </div>

                        <div className="mr-3">
                            <Form.Item
                                label="Data Fim"
                                name="DataFim"
                            >
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    onChange={(date, dateString) => this.setState({ DataFim: dateString })}
                                    value={this.state.DataFim}
                                />
                            </Form.Item>
                        </div>

                        <Col span={3}>
                            <Button type="success">
                                <AiOutlineFileSearch className="mr-2" size={16} />
                                Pesquisar
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={20}>
                            <ResponsiveContainer width="100%" height={500} className="container" style={{ margin: '20px' }}>
                                <BarChart data={this.state.chartData}>
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
                </Form>
            </>
        );
    }
}

export default withRouter(EstatisticaChaves);