import React, { useState } from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Space, Select, Image } from 'antd';
import { messages } from '../../../common/Messages/messages';
import { toast } from "react-toastify";

import service from '../service/chave.service';
import TituloModal from '../../../common/components/TituloModal/TituloModal';
import BotaoCadastrar from '../../../common/components/BotaoCadastrar/BotaoCadastrar';
import moment from 'moment';

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

const ChaveEditModal = ({ visible, onClose, chaveSelecionada }) => {
    const [data, setData] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [tipo, setTipo] = useState('');
    const { Option } = Select;

    const submitForm = (form) => {
        const dto = {
            Id: chaveSelecionada.Id,
            Marca: form.Marca,
            NumeroSerie: Number(form.NumeroSerie),
            Quantidade: Number(form.Quantidade),
            Data: data ? data : chaveSelecionada.Data,
            Tipo: tipo ? tipo : chaveSelecionada.Tipo
        };

        service.update(dto)
            .then(() => {
                toast.success(messages.EditadoSucesso('Chave'));
                onClose();
            })
            .catch(() => {
                toast.error(messages.EditadoErro('Chave'));
            });
    }


    const handleChangeOptionTipo = (tipo) => {
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

        setTipo(tipo);
        setImgSrc(img);
    }

    const closeModal = () => {
        setData('');
        setTipo('');
        setImgSrc('');
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose={true}
            afterClose={closeModal}
        >
            <TituloModal titulo={'Edição de Chave'} />

            <Form
                initialValues={chaveSelecionada}
                layout="vertical"
                onFinish={submitForm}
            >
                <Row>
                    <Col md={24} xs={24}>
                        <Form.Item
                            name="Marca"
                            label="Marca"
                            rules={[
                                { required: true, message: messages.campoObrigatorio }
                            ]}
                        >
                            <Input
                                type="text"
                                autoFocus
                                placeholder={'Pado'}
                                maxLength={30}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={10}>
                    <Col md={8} xs={24}>
                        <Form.Item
                            name="NumeroSerie"
                            label="Número de Série"
                            rules={[
                                { required: true, message: messages.campoObrigatorio }
                            ]}
                        >
                            <Input
                                type="number"
                                placeholder={123}
                                max={99999}
                                min={1}
                            />
                        </Form.Item>
                    </Col>

                    <Col md={8} xs={24}>
                        <Form.Item
                            name="Quantidade"
                            label="Quantidade"
                            rules={[
                                { required: true, message: messages.campoObrigatorio }
                            ]}
                        >
                            <Input
                                disabled
                                type="number"
                            />
                        </Form.Item>
                    </Col>

                    <Col md={8} xs={24}>
                        <Form.Item
                            name="Data"
                            label="Data de Cadastro"
                            rules={[
                                { required: true, message: messages.campoObrigatorio }
                            ]}
                        >
                            <Space direction="vertical">
                                <DatePicker
                                    format={'DD/MM/YYYY'}
                                    onChange={(date, dateString) => setData(dateString)}
                                    defaultValue={moment(chaveSelecionada.Data, 'DD/MM/YYYY')}
                                />
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={10}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            label="Tipo"
                            name="Tipo"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Select defaultValue="Selecione" onChange={handleChangeOptionTipo}>
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
                    <Col md={8} xs={24}>
                        <Image.PreviewGroup>
                            <Image
                                alt="Imagem da Chave"
                                className="img-fluid"
                                preview={{ visible: false }}
                                style={{ border: '1px dashed #CCC' }}
                                src={
                                    !imgSrc ?
                                        chaveSelecionada.Tipo === 'Plana' ? Plana :
                                            chaveSelecionada.Tipo === 'PlanaColorida' ? PlanaColorida :
                                                chaveSelecionada.Tipo === 'AutomotivaAco' ? AutomotivaAco :
                                                    chaveSelecionada.Tipo === 'AutomotivaLogotipo' ? AutomotivaLogotipo :
                                                        chaveSelecionada.Tipo === 'AutomotivaMetalica' ? AutomotivaMetalica :
                                                            chaveSelecionada.Tipo === 'AutomotivaPlastica' ? AutomotivaPlastica :
                                                                chaveSelecionada.Tipo === 'Cofre' ? Cofre :
                                                                    chaveSelecionada.Tipo === 'Transponder' ? Transponder :
                                                                        chaveSelecionada.Tipo === 'Tetra' ? Tetra :
                                                                            chaveSelecionada.Tipo === 'Gorje' ? Gorje :
                                                                                chaveSelecionada.Tipo === 'Tubular' ? Tubular : ''
                                        :
                                        imgSrc
                                }
                            />
                        </Image.PreviewGroup>
                    </Col>
                </Row>

                <BotaoCadastrar
                    possuiCancelar
                    funcaoCancelar={onClose}
                />
            </Form>
        </Modal>
    );

}

export default ChaveEditModal;