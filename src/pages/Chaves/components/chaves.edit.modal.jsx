import React, { useState } from 'react';
import { Modal, Form, Input, Row, Col, Select, Image, Divider } from 'antd';
import { messages } from '../../../common/Enum/messages';
import { toast } from "react-toastify";

import TituloModal from '../../../common/components/TituloModal/TituloModal';
import ChaveSevice from '../../../services/chave.service';
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

const ChaveEditModal = ({ visible, onClose, chaveSelecionada }) => {

    const { Option } = Select;
    const [imgSrc, setImgSrc] = useState('');

    const submitForm = async (form) => {

        const dto = {
            Marca: form.Marca,
            NumeroSerie: Number(form.NumeroSerie),
            Quantidade: Number(chaveSelecionada.Quantidade),
            Tipo: form.Tipo,
            Data: chaveSelecionada.Data
        };

        await ChaveSevice.Update(chaveSelecionada.Id, dto)
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

        setImgSrc(img);
    }

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose={true}
        >
            <TituloModal 
                titulo={'Edição de Chave'}
                subTitulo={'Atualize as informações sobre a chave'}
            />

            <Form
                initialValues={chaveSelecionada}
                layout="vertical"
                onFinish={submitForm}
            >
                <Row gutter={10}>

                    <Col md={10} xs={24}>
                        <Form.Item
                            name="Marca"
                            label="Marca"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                type="text"
                                autoFocus
                                placeholder={'Marca'}
                                maxLength={30}
                                tabIndex={1}
                            />
                        </Form.Item>
                    </Col>

                    <Col md={10} xs={24}>
                        <Form.Item
                            name="NumeroSerie"
                            label="Número de Série"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Input
                                type="number"
                                placeholder={"Número de Série"}
                                max={99999}
                                min={1}
                                tabIndex={2}
                            />
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={10}>

                    <Col md={12} xs={24}>
                        <Form.Item
                            label="Tipo da Chave"
                            name="Tipo"
                            rules={[{ required: true, message: messages.CampoObrigatorio }]}
                        >
                            <Select defaultValue="Selecione" onChange={handleChangeOptionTipo} tabIndex={3}>
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
                    
                    <Col md={8} xs={12}>
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

                <Divider />

                <BotaoCadastrar
                    funcaoCancelar={onClose}
                />

            </Form>
        </Modal >
    );

}

export default ChaveEditModal;