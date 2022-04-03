import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, DatePicker, Select, Breadcrumb, Image } from 'antd';
import { Row, Col } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";
import { AiOutlineHome } from "react-icons/ai";

import chaveService from '../service/chave.service';
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

const ChaveCadastro = () => {
    const [data, setData] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [tipo, setTipo] = useState('');

    const history = useHistory();
    const { Option } = Select;

    const submitForm = (form) => {

        const dto = {
            Marca: form.Marca,
            NumeroSerie: Number(form.NumeroSerie),
            Quantidade: Number(form.Quantidade),
            Data: data,
            Tipo: tipo
        }

        chaveService.post(dto)
            .then(() => {
                toast.success(messages.cadastradoSucesso('Chave'));
                history.push(Rotas.Chaves);
            })
            .catch(() => {
                toast.error(messages.cadastradoErro('Chave'));
            });
    };

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
        setImgSrc(img);
        setTipo(tipo);
    }

    return (
        <div className="container">
            <div className="t-center mb-2">
                <h1> Cadastrar Chave</h1>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={Rotas.Home}>
                            <AiOutlineHome className="mr-1" />
                            Início
                            </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >Chaves</Breadcrumb.Item>
                    <Breadcrumb.Item>Cadastrar chave</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Form layout="vertical" onFinish={submitForm}>
                <Row gutter={10} >
                    <Col md={6} xs={24}>
                        <Form.Item
                            label="Marca"
                            name="Marca"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <Input
                                type="text"
                                placeholder="Pado"
                                maxLength={50}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={4} xs={24}>
                        <Form.Item
                            label="Número de Série"
                            name="NumeroSerie"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <Input
                                type="number"
                                placeholder="123"
                                min={1}
                                max={9999}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={4} xs={24}>
                        <Form.Item
                            label="Quantidade"
                            name="Quantidade"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <Input
                                type="number"
                                placeholder="0"
                                min={1}
                                max={999}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={4} xs={24}>
                        <Form.Item
                            label="Data"
                            name="Data"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                onChange={(date, dateString) => setData(dateString)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col md={6} xs={24}>
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
                    <Col md={4} xs={24}>
                        <Image.PreviewGroup>
                            {imgSrc && (
                                <Image
                                    width={200}
                                    alt="Imagem da Chave"
                                    preview={{ visible: false }}
                                    style={{ border: '1px dashed #CCC' }}
                                    src={imgSrc} />
                            )}
                        </Image.PreviewGroup>
                    </Col>
                </Row>

                <BotaoCadastrar />

            </Form>
        </div>
    );
}

export default ChaveCadastro;