import React, { Component } from 'react';
import { Modal, Form, Input, DatePicker, Space, Select, Image } from 'antd';
import { Row, Col } from 'antd';
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

class ChavesEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Marca: undefined,
            NumeroSerie: undefined,
            Quantidade: undefined,
            Data: undefined,
            Tipo: undefined,
            ImgSrc: undefined
        };
    }

    render() {
        const { visible, onClose } = this.props;
        const { chaveSelecionada } = this.props;
        const { Option } = Select;

        const submitForm = () => {

            const dto = {
                Id: chaveSelecionada.Id,
                Marca: this.state.Marca ?? chaveSelecionada.Marca,
                NumeroSerie: this.state.NumeroSerie ?? chaveSelecionada.NumeroSerie,
                Quantidade: chaveSelecionada.Quantidade,
                Data: this.state.Data ?? chaveSelecionada.Data,
                Tipo: this.state.Tipo ?? chaveSelecionada.Tipo
            };

            service.update(dto)
                .then(() => {
                    toast.success(messages.EditadoSucesso('Chave'));
                    this.props.onClose();
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
            this.setState({
                Tipo: tipo,
                ImgSrc: img
            });
        }

        return (
            <Modal
                visible={visible}
                onCancel={onClose}
                footer={null}
                destroyOnClose
            >
                <TituloModal titulo={'Edição de Chave'} />

                <Form
                    initialValues={chaveSelecionada}
                    layout="vertical"
                    onFinish={submitForm}
                >
                    <Row>
                        <Col span={24}>
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
                                    maxLength={30}
                                    onChange={(e) => this.setState({ Marca: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                name="NumeroSerie"
                                label="Número de Série"
                                rules={[
                                    { required: true, message: messages.campoObrigatorio }
                                ]}
                            >
                                <Input
                                    type="number"
                                    max={99999}
                                    min={0}
                                    onChange={(e) => this.setState({ NumeroSerie: e.target.value })}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
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
                                    max={10}
                                    min={0}
                                    onChange={(e) => this.setState({ Quantidade: e.target.value })}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                name="Data"
                                label="Data de Cadastro"
                            >
                                <Space direction="vertical">
                                    <DatePicker
                                        format={'DD/MM/YYYY'}
                                        onChange={(date, dateString) => this.setState({ Data: dateString })}
                                        defaultValue={moment(chaveSelecionada.dataCadastro)} />
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={10}>
                        <Col span={12}>
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
                        <Col span={8}>
                            <Image.PreviewGroup>
                                <Image
                                    alt="Imagem da Chave"
                                    className="img-fluid"
                                    preview={{ visible: false }}
                                    style={{ border: '1px dashed #CCC' }}
                                    src={
                                        !this.state.ImgSrc ?
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
                                            this.state.ImgSrc
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
}

export default ChavesEditModal;