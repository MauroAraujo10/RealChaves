import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { messages } from '../../../common/Enum/messages';
import { Breadcrumb, Tooltip } from 'antd';
import { Rotas } from '../../../Routes/rotas';
import { toast } from "react-toastify";

import service from '../../../service';
import servicosService from '../service/servicos.service';
import tabelas from '../../../common/Enum/tabelas';

import Grid from '../../../common/components/Grid/Grid';
import ServicosEditModal from '../components/servicos.edit.modal';
import YesOrNoModal from '../../../common/components/yesOrNoModal/yesOrNoModal';

import { AiOutlineHome, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const ServicosTabela = () => {
    const [servicos, setServicos] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState();
    const [modalEditServicoVisible, setModalEditServicoVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

    const columns = [
        { title: 'Serviço', dataIndex: 'Servico', key: 'Servico', width: '60%' },
        { title: 'Data do Serviço', dataIndex: 'Data', key: 'Data', width: '10%' },
        { title: 'Pago', dataIndex: 'Pago', key: 'Pago', width: '10%' },
        { title: 'Valor (R$)', dataIndex: 'Valor', key: 'Valor', width: '10%' },
        {
            title: 'Ações', key: 'acoes', width: '10%', render: (status, dto) => (
                <div style={{ display: 'flex' }}>
                    <Tooltip title="Editar">
                        <AiOutlineEdit
                            className="mr-2 iconEdit"
                            size={20}
                            onClick={() => funcaoAbrirModal(dto, 'Editar')}
                        />
                    </Tooltip>
                    <Tooltip title="Deletar">
                        <AiOutlineDelete
                            className="iconExcluir"
                            size={20}
                            onClick={() => funcaoAbrirModal(dto, 'Deletar')}
                        />
                    </Tooltip>
                </div>
            )
        }
    ];

    useEffect(() => {
        service.app.ref(tabelas.Servicos).on('value', (snapshot) => {
            let servicos = [];
            snapshot.forEach((x) => {
                servicos.push({
                    Id: x.key,
                    key: x.key,
                    Data: x.val().Data,
                    Servico: x.val().Servico,
                    Valor: x.val().Valor,
                    Pago: x.val().Pago ? 'Sim' : 'Não'
                })
            })
            setServicos(servicos);
        });
    }, []);

    const deletarServico = (id) => {
        servicosService.delete(id)
            .then(() => {
                toast.success(messages.exclusaoSucesso());
                setModalDeleteVisible(false);
            })
            .catch(() => {
                toast.error(messages.exclusaoErro('Serviço'));
            })
    }

    const funcaoAbrirModal = (dto, funcionalidade) => {
        switch (funcionalidade) {
            case 'Editar':
                setModalEditServicoVisible(true);
                setServicoSelecionado(dto);
                break;

            case 'Deletar':
                setModalDeleteVisible(true);
                setServicoSelecionado(dto);
                break;

            default:
                break;
        }
    }

    return (
        <div className="mt-2">
            <div className="t-center">
                <h1>Serviços Cadastrados</h1>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={Rotas.Home}>
                            <AiOutlineHome className="mr-1" />
                            Início
                                </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Serviços
                            </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Grid
                dataSource={servicos}
                columns={columns}
            />

            <ServicosEditModal
                visible={modalEditServicoVisible}
                onClose={() => setModalEditServicoVisible(false)}
                servicoSelecionado={servicoSelecionado}
            />

            <YesOrNoModal
                title={'Exclusão de Serviço'}
                text={messages.excluirRegistro('Serviço')}
                visible={modalDeleteVisible}
                onClose={() => setModalDeleteVisible(false)}
                onOk={() => deletarServico(servicoSelecionado?.Id)}
            />
        </div>

    );

}

export default ServicosTabela;
