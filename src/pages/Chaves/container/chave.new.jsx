import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Select, Image, Row, Col } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";

import HeaderForm from '../../../common/components/HeaderForm/HeaderForm';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';
import ChaveService from '../../../services/chave.service';

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
    const history = useHistory();
    const { Option } = Select;
    const [imgSrc, setImgSrc] = useState('');
    
    const submitForm = async (form) => {
        const dto = {
            Marca: form.Marca,
            NumeroSerie: Number(form.NumeroSerie),
            Tipo: form.Tipo,
            Quantidade: Number(form.Quantidade)
        };

        await ChaveService.Post(dto)
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
    }

    return (
        <div className="container mt-2">
            <HeaderForm
                titulo={'Cadastrar chave'}
                listaCaminhos={['Chaves', 'Cadastrar chave']}
            />

            <Form layout="vertical" onFinish={submitForm}>

                <Row gutter={10} >

                    <Col md={4} xs={24}>
                        <Form.Item
                            label="Marca"
                            name="Marca"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <Input
                                type="text"
                                placeholder="Marca"
                                maxLength={20}
                                autoFocus
                                tabIndex={1}
                            />
                        </Form.Item>
                    </Col>

                    <Col md={3} xs={24}>
                        <Form.Item
                            label="Número de Serie"
                            name="NumeroSerie"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <Input
                                type="number"
                                placeholder="Número de Serie"
                                min={1}
                                max={99999}
                                step={1}
                                tabIndex={2}
                            />
                        </Form.Item>
                    </Col>

                    <Col md={3} xs={24}>
                        <Form.Item
                            label="Quantidade"
                            name="Quantidade"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <Input
                                type="number"
                                placeholder="Quantidade"
                                min={1}
                                max={999}
                                step={1}
                                tabIndex={3}
                            />
                        </Form.Item>
                    </Col>

                    <Col md={4} xs={24}>
                        <Form.Item
                            label="Tipo da Chave"
                            name="Tipo"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}>
                            <Select defaultValue="Selecione" onChange={handleChange} tabIndex={4}>
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

                <BotaoCadastrar
                    funcaoCancelar={() => history.push(Rotas.Chaves)}
                />

            </Form>
        </div>
    );
}

export default ChaveCadastro;