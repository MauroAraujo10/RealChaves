import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, DatePicker, Select, Breadcrumb, Image } from 'antd';
import { Row, Col } from 'antd';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";

import { messages } from '../../../common/Messages/messages';
import service from '../service/chave.service';
import { AiOutlineHome } from "react-icons/ai";

import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';

import Plana from '../assets/Plana.jpg';
import PlanaColorida from '../assets/PlanaColorida.jpg';
import AutomotivaAco from '../assets/AutomotivaAco.jpg';
import AutomotivaLogotipo from '../assets/AutomotivaLogotipo.jpg';
import AutomotivaMetalica from '../assets/AutomotivaMetalica.jpg';
import AutomotivaPlastica from '../assets/AutomotivaPlastica.jpg';
import Cofre from '../assets/Cofre.jpg';
import Transponder from '../assets/Transponder.jpg';
import Tetra from '../assets/Tetra.jpg';
import Gorje from '../assets/Gorje.jpg';
import Tubular from '../assets/Tubular.jpg';

class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Marca: '',
            NumeroSerie: '',
            Quantidade: '',
            Tipo: '',
            Data: '',
            visible: false,
            imgSrc: ''
        };
    }

    render() {
        const { Option } = Select;

        const handleChange = (tipo) => {
            let img = '';
            switch (tipo) {
                case 'Plana': img = Plana; break;
                case 'PlanaColorida': img = PlanaColorida; break;
                case 'AutomotivaAco': img = AutomotivaAco; break;
                case 'AutomotivaLogotipo': img = AutomotivaLogotipo; break;
                case 'AutomotivaMetalica': img = AutomotivaMetalica; break;
                case 'AutomotivaPlastica': img = AutomotivaPlastica; break;
                case 'Cofre': img = Cofre; break;
                case 'Transponder': img = Transponder; break;
                case 'Tetra': img = Tetra; break;
                case 'Gorje': img = Gorje; break;
                case 'Tubular': img = Tubular; break;
                default: img = null; break;
            }
            this.setState({
                Tipo: tipo,
                imgSrc: img
            });
        }

        const submitForm = () => {
            service.post(this.state)
                .then(() => {
                    toast.success(messages.cadastradoSucesso('Chave'));
                    this.props.history.replace(Rotas.Chaves);
                })
                .catch(() => {
                    toast.error(messages.cadastradoErro('Chave'));
                });
        }

        return (
            <div className="container">
                <div className="t-center mb-2">
                    <h1> Cadastrar Chave</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={Rotas.Home}>
                                <AiOutlineHome className="mr-2" />
                                Início
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={Rotas.Chaves}>
                                Chaves
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Cadastrar chave
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Form layout="vertical" onFinish={submitForm}>
                    <Row gutter={10} className="mt-2">
                        <Col span={12}>
                            <Form.Item
                                label="Marca"
                                name="Marca"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                                <Input
                                    type="text"
                                    placeholder="Marca"
                                    maxLength="50"
                                    onChange={(e) => this.setState({ Marca: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="Número de Série"
                                name="NúmeroSerie"
                                rules={[
                                    { required: true, message: messages.CampoObrigatorio }
                                ]}>
                                <Input
                                    type="number"
                                    placeholder="Número de Série"
                                    min="0"
                                    onChange={(e) => this.setState({ NumeroSerie: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="Quantidade"
                                name="Quantidade"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                                <Input
                                    type="number"
                                    placeholder="Quantidade"
                                    min="0"
                                    onChange={(e) => this.setState({ Quantidade: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="Data"
                                name="Data"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    onChange={(date, dateString) => this.setState({ Data: dateString })}
                                    value={this.state.data} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={6}>
                            <Form.Item
                                label="Tipo"
                                name="Tipo"
                                rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                                <Select defaultValue="Selecione" onChange={handleChange}>
                                    <Option value="Plana">Plana</Option>
                                    <Option value="PlanaColorida">Plana Colorida</Option>
                                    <Option value="AutomotivaAco">Automotiva de Aço</Option>
                                    <Option value="AutomotivaLogotipo">Automotiva Logotipo</Option>
                                    <Option value="AutomotivaMetalica">Automotiva Metálica</Option>
                                    <Option value="AutomotivaPlastica">Automotivas Plásticas</Option>
                                    <Option value="Cofre">Cofre</Option>
                                    <Option value="Transponder">Transponder</Option>
                                    <Option value="Tetra">Tetra</Option>
                                    <Option value="Gorje">Gorje</Option>
                                    <Option value="Tubular">Tubular</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Image.PreviewGroup>
                                {this.state.imgSrc && (
                                    <Image
                                        alt="Imagem da Chave"
                                        preview={{ visible: false }}
                                        style={{ border: '1px dashed #CCC' }}
                                        src={this.state.imgSrc} />
                                )}
                            </Image.PreviewGroup>
                        </Col>
                    </Row>

                    <BotaoCadastrar />

                </Form>
            </div>
        );
    }
}

export default withRouter(New);